import { IAddress } from "./IAddress";
import { Product } from "./Product";

export interface IOrderDetails{
    orderId:number;
    userId:number;
    orderStatus:string;
    productId:number;
    orderLineProductList:Product[];
    totalBill:number;
    shippingAddressId:number;
    shippingAddress:IAddress;
}