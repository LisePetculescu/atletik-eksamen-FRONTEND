
export type ParticipantResponse = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
    ageGroup: string;
    discipline: string[];
    results: string[];
};

export type ParticipantRequest = {
    id?: number;
    name: string;
    age: number;
    clubName: string;
    gender: string;
};
