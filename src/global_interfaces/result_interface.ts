import {  DisciplineResponse } from "./discipline_interface";

export type ResultResponse = {
    id?: number;
    date: string;
    resultValue: number;
    participantName: string;
    disciplineName: string;
    resultType: string;
    result: string
    discipline: DisciplineResponse;
};

export type ResultRequest = {
    date: string;
    resultValue: number;
    participantName: string;
    disciplineName: string;
};
