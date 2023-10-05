import { ICategory } from "./ICategory";
import { IMainCategory } from "./IMainCategory";
import { ISecondaryCategory } from "./ISecondaryCategory";
import { ISubCategory } from "./ISubCategory";

export interface Product {
    productId: number;
    productName: string;
    price: number;
    description: string;
    productStatus: string;
    image: File;
    imagePath: string;
    category: ICategory;
    mainCategory: IMainCategory;
    subCategory: ISubCategory;
    secondaryCategory: ISecondaryCategory
    sizes: Set<string>;
    quantity: number;

    productInventoryStatus: boolean;
    quantityInStock: number;
}