export interface IBlog{
    _id? : string | number ,
    name?: string ,
    img?:string,
    description?: string | number

}
export interface IProductApiResponseBlog {
    message: string;
    data : IBlog[]
  }