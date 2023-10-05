import { Product } from "./Product";

export interface IUserCart{
    cartId:number;
    userId:number;
    productId:number;
    cartLineProduct:Product;
    quantity:number;
    cartDate:Date;
    cartSelected: boolean;

    msg:string;
    textColor:string;
}