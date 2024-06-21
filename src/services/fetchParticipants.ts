import { ParticipantResponse, ParticipantRequest } from "../global_interfaces/participant_interface";

const API_URL = "http://localhost:8080/participant";

async function getAllParticipants(): Promise<ParticipantResponse[]> {
  try {
    console.log("Fetching all participants...");

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch all participants: ${response.status} ${response.statusText}`);
    }
    const participants: ParticipantResponse[] = await response.json();
    console.log("Participants fetched successfully!");
    return participants;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getParticipantById(id: number): Promise<ParticipantResponse> {
  try {
    console.log(`Fetching participant with id ${id}...`);

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch participant: ${response.status} ${response.statusText}`);
    }
    const participant: ParticipantResponse = await response.json();
    console.log("Participant fetched successfully!");
    return participant;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function addParticipant(participant: ParticipantRequest): Promise<ParticipantResponse> {
  try {
    console.log("Adding participant...");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });

    if (!response.ok) {
      throw new Error(`Failed to add participant: ${response.status} ${response.statusText}`);
    }
    const addedParticipant: ParticipantResponse = await response.json();
    console.log("Participant added successfully!");
    return addedParticipant;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateParticipant(id: number, participant: ParticipantRequest): Promise<ParticipantResponse> {
  try {
    console.log(`Updating participant with id ${id}...`);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });

    if (!response.ok) {
      throw new Error(`Failed to update participant: ${response.status} ${response.statusText}`);
    }
    const updatedParticipant: ParticipantResponse = await response.json();
    console.log("Participant updated successfully!");
    return updatedParticipant;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteParticipant(id: number): Promise<void> {
  try {
    console.log(`Deleting participant with id ${id}...`);

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete participant: ${response.status} ${response.statusText}`);
    }
    console.log("Participant deleted successfully!");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { getAllParticipants, getParticipantById, addParticipant, updateParticipant, deleteParticipant };
