import { Lesson } from '@/interface/lessons';
export interface IProduct{
    _id?:number|string,
    name: string,
    price: number | string,
    img: string,
    description:string,
    categoryId:any,
    paymentContent:string | null,
    lessons:Lesson[],
}
 export interface IProductApiResponse {
    message: string;
    data: IProduct[]; // Đặt kiểu dữ liệu cho thuộc tính 'data' là một mảng các sản phẩm
  } 
  
 export interface IProductApiResponse_id {
  message: string;
  data: IProduct; // Đặt kiểu dữ liệu cho thuộc tính 'data' là một mảng các sản phẩm
} 