import { IStockData } from "./IStockData";
import { Product } from "./Product";

export interface IInventoryRequest {
    productId:number;
    product:Product;
    inventoryStatus:boolean;
    sizeAndQuantity:IStockData[];
}