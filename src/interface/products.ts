export interface IProduct{
    _id?:number|string,
    name: string,
    price: number | string,
    img: string,
    description:string,
    categoryId: string,
    paymentDetails:string | null
}
 export interface IProductApiResponse {
    message: string;
    data: IProduct[]; // Đặt kiểu dữ liệu cho thuộc tính 'data' là một mảng các sản phẩm
  } 