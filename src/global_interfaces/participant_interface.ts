import { DisciplineResponse } from "./discipline_interface";
import { ResultResponse } from "./result_interface";

export type ParticipantResponse = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
    ageGroup: string;
    disciplines: DisciplineResponse[];
    results: ResultResponse[];
};

export type ParticipantRequest = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
    disciplines: DisciplineResponse[]
};
