import { Injectable } from '@angular/core';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  products: Product[] = [
    // { "productId": 1001, "productName": "TV", "price": 50000, "description":"dd", "image": "../assets/images/TV.jpg" },
    // { "productId": 1002, "productName": "Acer Extensa 15 laptop", "price": 75000,"description":"Acer Extensa 15 Thin & Light Intel Processor Pentium Silver N5030 15.6 inches ( 39 cm ) Business Laptop (4GB RAM/256 GB SSD/Windows 11 Home/Black/1.9 Kg, EX215-31)" ,"image": "../assets/images/laptop.jpg" },
    // { "productId": 1003, "productName": "Apple iPhone 14 Pro", "price": 129000, "description":" The iPhone 14 Pro 5G Dual SIM comes with a 6.1 inch touchscreen with 460PPI. It packs a 48-megapixel pro camera with main ultra wide system and a 12-megapixel selfie-camera with TrueDepth with autofocus. This is all powered by the Apple A16 Bionic (4 nm) chipset and 6GB of RAM.", "image": "../assets/images/mobile.jpg" },
    // { "productId": 1004, "productName": "Headphone", "price": 5000, "description":"fffs sfs", "image": "../assets/images/headphone.jpg" },
    // { "productId": 1005, "productName": "Harddisk", "price": 7000, "description":"df rt er", "image": "../assets/images/harddisk.jpg" }
  ];

  getAllProucts():Product[]{
    return this.products;
  }

  getByid(id:number):any{

    return this.products.find(product => product.productId==id);
  //return this.products.find(this.products => this.products.productId == id);

  }
  addProduct(product:any){
    this.products.push(product);
  }
}
