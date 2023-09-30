export interface IRating {
    _id: string; 
    rating: number; 
    hidden: boolean
}

export interface IRatingApiResponse {
    data: IRating[]; 
    message: string;
}