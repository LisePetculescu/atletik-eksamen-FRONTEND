
export type ResultResponse = {
    id?: number;
    date: string;
    resultValue: number;
    participantName: string;
    disciplineName: string;
    resultType: string;
};

export type ResultRequest = {
    date: string;
    resultValue: number;
    participantName: string;
    disciplineName: string;
};
