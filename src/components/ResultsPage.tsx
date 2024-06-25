import { useEffect, useState } from "react";
import { getAllResults, deleteResult } from "../services/fetchResults";
import { ResultResponse } from "../global_interfaces/result_interface";
import { getAllDisciplines } from "../services/fetchDisciplines";
import { DisciplineResponse } from "../global_interfaces/discipline_interface";

type SortDirection = "asc" | "desc";

export default function ResultsPage(): JSX.Element {
  const [results, setResults] = useState<ResultResponse[]>([]);
  const [sortType, setSortType] = useState<"resultType" | "resultValue">();
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterValue, setFilterValue] = useState("100m Sprint");
  const [disciplines, setDisciplines] = useState<DisciplineResponse[]>([]);

  useEffect(() => {
    fetchResults();
    getAllDisciplines().then((data) => setDisciplines(data));
  }, []); // Fetch results on initial render

 

  const fetchResults = async () => {
    try {
      const fetchedResults = await getAllResults();
      console.log(fetchedResults);
      
      setResults(fetchedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleSort = (type: "resultType" | "resultValue") => {
    // Toggle sort direction if same column clicked
    if (type === sortType) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortDirection("asc");
    }
  };


  function sortAndFilterResults() {
    console.log("før filter: ", results);
    const filteredResults = results.filter((result) => result.disciplineName == filterValue);

    console.log("efter filter: ", results);

    const sortResults = filteredResults.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.resultValue - b.resultValue;
      } else {
        return b.resultValue - a.resultValue;
      }
    });

    console.log(sortResults);

    return sortResults;
  }

  const handleDeleteResult = async (id: number) => {
    try {
      await deleteResult(id);
      console.log("Result deleted:", id);
      fetchResults(); // Refresh the results after delete
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  return (
    <div>
      <h1>Resultater</h1>
      <label>
        Vælg disciplin: 
        <select onChange={(e) => setFilterValue(e.target.value)}>
          {disciplines.map((discipline) => <option value={discipline.name}>{discipline.name}</option> )}
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Result Type</th>
            <th onClick={() => handleSort("resultValue")}>Result Value {<span>{sortDirection === "asc" ? "▲" : "▼"}</span>}</th>
            <th>Date</th>
            <th>Participant Name</th>
            <th>Discipline Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results ? sortAndFilterResults().map((result) => (
            <tr key={result.id}>
              <td>{result.resultType}</td>
              <td>{result.resultValue}</td>
              <td>{result.date}</td>
              <td>{result.participantName}</td>
              <td>{result.disciplineName}</td>
              <td>
                <button onClick={() => handleDeleteResult(result.id!)}>Delete</button>
              </td>
            </tr>
          )): ""} 
        </tbody>
      </table>
    </div>
  );
}
