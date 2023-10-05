import { IAddress } from "./IAddress";
import { IUserRole } from "./IUserRole";

export interface IUsers {

	id: any;
	firstName: string;
	lastName: string;
	email: String;
	password: string;
	contactNumber: string;
	createdAt: Date;
	updatedAt: Date;
	lastLogin: Date;
	accountStatus: boolean;
	roles: any;
	addresses: IAddress[];
}