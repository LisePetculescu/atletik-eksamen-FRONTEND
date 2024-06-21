import { DisciplineResponse } from "../global_interfaces/discipline_interface";


const API_URL = "http://localhost:8080/discipline";

async function getAllDisciplines(): Promise<DisciplineResponse[]> {
    try {
        console.log("Fetching all disciplines...");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch all disciplines: ${response.status} ${response.statusText}`);
        }
        const disciplines: DisciplineResponse[] = await response.json();
        console.log("Disciplines fetched successfully!");
        return disciplines;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export { getAllDisciplines };