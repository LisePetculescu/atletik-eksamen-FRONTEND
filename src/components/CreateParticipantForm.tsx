import React, { useEffect, useState } from "react";
import { addParticipant } from "../services/fetchParticipants";
import { ParticipantRequest } from "../global_interfaces/participant_interface";
import { getAllDisciplines } from "../services/fetchDisciplines";
import { DisciplineResponse } from "../global_interfaces/discipline_interface";

export default function CreateParticipantForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(6);
  const [gender, setGender] = useState("");
  const [clubName, setClubName] = useState("");
  const [disciplines, setDisciplines] = useState<DisciplineResponse[]>([]);
  const [disciplineData, setDisciplineData] = useState<DisciplineResponse[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clubsData = [
    "Københavns Atletik Forening",
    "Aarhus Atletik Forening",
    "Odense Atletik Forening",
    "Aalborg Atletik Forening",
    "Christianhavns Atletik Forening",
    "Roskilde Atletik Forening",
    "Køge Atletik Forening",
    "Horsens Atletik Forening",
    "Helsingør Atletik Forening",
    "Hillerød Atletik Forening",
  ];

  useEffect(() => {
    console.log("Fetching disciplines...");
    // Fetch disciplines here
    getAllDisciplines().then((data) => {setDisciplineData(data)
    }); 

  }, []);

 

  const handleChangeClubName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClubName(e.target.value);
  };

  const handleChangeDiscipline = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const disciplineName = e.target.value;
    if (disciplines.find((disciplin) => disciplineName == disciplin.name )) {
      return
    }
    const foundDiscipline = disciplineData.find((discipline) => disciplineName == discipline.name);
    if (foundDiscipline)
      setDisciplines([... disciplines, foundDiscipline]);
    // setDisciplines([... disciplines, disciplineData.find((discipline) => disciplineName == discipline.name)!]);
    
  }

  const removeDiscipline = (incomingDisciplin: DisciplineResponse) => {
    const filterDisciplines = disciplines.filter((current) => current.id !== incomingDisciplin.id)
    setDisciplines(filterDisciplines)

  }





  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const participantData: ParticipantRequest = {
      name: name,
      age: age,
      gender: gender,
      clubName: clubName,
      disciplines: disciplines
    };

    try {
      console.log("Participant data:", participantData);

      const addedParticipant = await addParticipant(participantData);
      console.log("Participant added:", addedParticipant);

      // Handle success
      setSuccessMessage("Participant added successfully!");
      setErrorMessage(""); // Clear any previous error messages

      // Reset form fields
      setName("");
      setAge(6); // Assuming you want to reset age to 6
      setGender("");
      setClubName("");
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding participant:", error);
        setErrorMessage("Error adding participant: " + error.message);
      } else {
        // Handle cases where the error is not an Error object
        console.error("An unexpected error occurred:", error);
        setErrorMessage("An unexpected error occurred");
      }
      // Clear success message if there was any
      setSuccessMessage("");
    }
  };

  return (
    <>
      <h2>Tilføj eller rediger deltagere her:</h2>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} style={{ fontSize: "1.5rem" }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} required />
        </label>
        <br />
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="BINARY">Binary</option>
            <option value="TRANSmTf">TransMtF</option>
            <option value="TRANSfTm">TransFtM</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <br />
        <label>
          Club Name:
          <select value={clubName} onChange={handleChangeClubName} required>
            <option value="">Select a club</option>
            {clubsData.map((club, index) => (
              <option key={index} value={club}>
                {club}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Discipliner:
          <select onChange={handleChangeDiscipline} required>
            <option value="">Select discipline</option>
            {disciplineData.map((discipline, index) => (
              <option key={index} value={discipline.name}>
                {discipline.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div style={{fontSize:"1rem"}}>
          <ul>
            Selected disciplines:{" "}
            {disciplines.map((discipline) => (
              <li>
                {discipline.name}
                <button onClick={() => removeDiscipline(discipline)}>x</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" >Tilføj</button>
      </form>
    </>
  );
}
