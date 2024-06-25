import { useEffect, useState } from "react";
import { getParticipantById } from "../services/fetchParticipants";
import { ParticipantResponse } from "../global_interfaces/participant_interface";
import { useParams } from "react-router-dom";

export default function ParticipantDetails() {
    const { participantId } = useParams();
    const [participant, setParticipant] = useState<ParticipantResponse | null>(null);

    
    useEffect(() => {
        const fetchParticipant = async () => {
        try {
            if (participantId) {
            const fetchedParticipant = await getParticipantById(Number(participantId));
            setParticipant(fetchedParticipant);
        }
        } catch (error) {
            console.error("Error fetching participant:", error);
        }
        };
    
    
        fetchParticipant();
    }, [participantId]);
    
    return (
      <div>
        {participant ? (
          <div>
            <h2>{participant.name}</h2>
            <p>Age: {participant.age}</p>
            <p>Age group: {participant.ageGroup}</p>
            <p>Gender: {participant.gender}</p>
            <p>Club: {participant.clubName}</p>
            <h3>Disciplines:</h3>
            <ul>
              {participant.disciplines.map((discipline) => (
                <li key={discipline.id}>{discipline.name}</li>
              ))}
            </ul>
            <h3>Results:</h3>
            <ul>
              {participant.results.map((result) => (
                <li key={result.id}>
                  <p>Name: {result.discipline.name}</p>{" "}
                  <p>
                    {result.resultType}: {result.result}
                  </p>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );

  
}
