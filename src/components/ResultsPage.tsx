import { useEffect, useState } from "react";
import { getAllResults, deleteResult } from "../services/fetchResults";
import { ResultResponse } from "../global_interfaces/result_interface";

type SortDirection = "asc" | "desc";

export default function ResultsPage(): JSX.Element {
  const [results, setResults] = useState<ResultResponse[]>([]);
  const [sortType, setSortType] = useState<"resultType" | "resultValue">();
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    fetchResults();
  }, []); // Fetch results on initial render

  const fetchResults = async () => {
    try {
      const fetchedResults = await getAllResults();
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

  const sortedResults = results.slice().sort((a, b) => {
    if (sortType === "resultType") {
      if (sortDirection === "asc") {
        return a.resultType.localeCompare(b.resultType);
      } else {
        return b.resultType.localeCompare(a.resultType);
      }
    } else if (sortType === "resultValue") {
      if (sortDirection === "asc") {
        return a.resultValue - b.resultValue;
      } else {
        return b.resultValue - a.resultValue;
      }
    }
    return 0;
  });

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
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("resultType")}>Result Type {sortType === "resultType" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}</th>
            <th onClick={() => handleSort("resultValue")}>Result Value {sortType === "resultValue" && <span>{sortDirection === "asc" ? "▲" : "▼"}</span>}</th>
            <th>Date</th>
            <th>Participant Name</th>
            <th>Discipline Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((result) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
