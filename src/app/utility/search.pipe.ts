import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './Product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  //transform(value: Array, args: text from textfield): Object 
  transform(products: Product[], args: string): Product[] {
    let searchStr: string = args.toLowerCase();
   return products.filter(product =>{

      let productName = product.productName.toLowerCase()
      return productName.indexOf(searchStr)!==-1;
    });
    //return null;
  }

}
