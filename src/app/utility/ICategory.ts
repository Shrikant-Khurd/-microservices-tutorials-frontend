import { IMainCategory } from "./IMainCategory";
import { ISecondaryCategory } from "./ISecondaryCategory";
import { ISubCategory } from "./ISubCategory";

export interface ICategory {
     mainCategory: IMainCategory;
	 subCategory :ISubCategory;
	 secondaryCategory :ISecondaryCategory;

}