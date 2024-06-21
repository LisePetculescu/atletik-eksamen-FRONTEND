import { ResultRequest, ResultResponse } from "../global_interfaces/result_interface";

const API_URL = "http://localhost:8080/result";

async function getAllResults(): Promise<ResultResponse[]> {
    try {
        console.log("Fetching all results...");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch all results: ${response.status} ${response.statusText}`);
        }
        const results: ResultResponse[] = await response.json();
        console.log("Results fetched successfully!");
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getResultById(id: number): Promise<ResultResponse> {
    try {
        console.log(`Fetching result with id ${id}...`);

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch result: ${response.status} ${response.statusText}`);
        }
        const result: ResultResponse = await response.json();
        console.log("Result fetched successfully!");
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function addResult(result: ResultRequest): Promise<ResultResponse> {
    try {
        console.log("Adding result...");

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        });

        if (!response.ok) {
            throw new Error(`Failed to add result: ${response.status} ${response.statusText}`);
        }
        const addedResult: ResultResponse = await response.json();
        console.log("Result added successfully!");
        return addedResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateResult(id: number, result: ResultRequest): Promise<ResultResponse> {
    try {
        console.log(`Updating result with id ${id}...`);

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        });

        if (!response.ok) {
            throw new Error(`Failed to update result: ${response.status} ${response.statusText}`);
        }
        const updatedResult: ResultResponse = await response.json();
        console.log("Result updated successfully!");
        return updatedResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteResult(id: number): Promise<void> {
    try {
        console.log(`Deleting result with id ${id}...`);

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete result: ${response.status} ${response.statusText}`);
        }
        console.log("Result deleted successfully!");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { getAllResults, getResultById, addResult, updateResult, deleteResult };