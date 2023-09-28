export interface Quizz{
    _id?:number|string,
    name: string,
    correctAnswer:string,
    Wronganswer1:string,
    Wronganswer2:string,
    Wronganswer3:string,
    lessonId:string|number,
}