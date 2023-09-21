export interface IUsers {
    _id?:string|number,
    name?:string,
    email?: string,
    password?: number,
    phoneNumber?:number,
    role?:string,
    secret: string
}
export interface IProductApiResponseUser {
    message: string;
    data : IUsers[]
  }
  
export interface IBlog{
    _id? : string | number ,
    name?: string |number,
    img?:string,
    description?: string | number

}