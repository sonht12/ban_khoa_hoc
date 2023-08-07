export interface IProduct{
    _id?:number|string,
    name: string,
    price: number | string,
    img: string,
    description:string,
    categoryId: string
}