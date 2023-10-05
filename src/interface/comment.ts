export interface IComment {
    _id: string; 
    comment: string | number; 
    hidden: boolean
}

export interface ICommentApiResponse {
    data: IComment[]; 
    message: string;
}