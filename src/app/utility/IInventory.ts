import { Product } from "./Product";

export interface IInventory {
    id:any;
    productId:number;
    product:Product;
    quantityInStock:number;
    inventoryStatus:boolean;
    
}