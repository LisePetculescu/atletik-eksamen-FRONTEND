import React, { useState, useEffect } from "react";
import { updateParticipant, getParticipantById } from "../services/fetchParticipants";
import { ParticipantRequest, ParticipantResponse } from "../global_interfaces/participant_interface";

export default function UpdateParticipantForm({ participantId }: { participantId: number }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(6);
  const [gender, setGender] = useState("");
  const [clubName, setClubName] = useState("");
  const [participant, setParticipant] = useState<ParticipantResponse | null>(null); // State to hold participant data
  const [updateSuccess, setUpdateSuccess] = useState(false); // State to track update success

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
    // Fetch participant data based on participantId
    const fetchParticipant = async () => {
      try {
        const fetchedParticipant = await getParticipantById(participantId);
        setParticipant(fetchedParticipant);
        setName(fetchedParticipant.name);
        setAge(fetchedParticipant.age);
        setGender(fetchedParticipant.gender);
        setClubName(fetchedParticipant.clubName);
      } catch (error) {
        console.error("Error fetching participant:", error);
        // Handle error fetching participant data
      }
    };

    fetchParticipant();
  }, [participantId]);

  const handleChangeClubName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClubName(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // const participantData: ParticipantRequest = {
    //   id: participantId,
    //   name: name,
    //   age: age,
    //   gender: gender,
    //   clubName: clubName,
    //   disciplines: disciplines
    // };

    try {
      // console.log("Updating participant data:", participantData);

      // const updatedParticipant = await updateParticipant(participantId, participantData);
      // console.log("Participant updated:", updatedParticipant);

      // Handle success, e.g., show a success message or redirect
      setUpdateSuccess(true);

      // Reset form fields
      setName("");
      setAge(6);
      setGender("");
      setClubName("");
    } catch (error) {
      console.error("Error updating participant:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  if (!participant) {
    return <div>Loading...</div>; // Add loading indicator while fetching participant data
  }

  return (
    <>
      <h2>Tilføj eller rediger deltagere her:</h2>
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
        <button type="submit">Opdater</button>
      </form>
      {updateSuccess && <div>Update successful! Form cleared.</div>}
    </>
  );
}
