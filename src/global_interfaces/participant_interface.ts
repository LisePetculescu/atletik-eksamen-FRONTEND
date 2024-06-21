import { DisciplineResponse } from "./discipline_interface";

export type ParticipantResponse = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
    ageGroup: string;
    disciplines: DisciplineResponse[];
};

export type ParticipantRequest = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
};
