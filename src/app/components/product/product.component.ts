import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IMainCategory } from 'src/app/utility/IMainCategory';
import { IInventory } from 'src/app/utility/IInventory';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';
import { SearchPipe } from 'src/app/utility/search.pipe';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  searchBy: string = "";
  // products: any[] = [];
  products: any //{ quantityInStock: number } : any;
  categories: any;
  apiResponse:any;
  decodedToken: any;
  msg: any;
  productInventory!: IInventory[];
  // products: Product[] = [
  //   { "productId": 1001, "productName": "TV", "price": 50000, "image": "../assets/images/TV.jpg" },
  //   { "productId": 1002, "productName": "Laptop", "price": 75000, "image": "../assets/images/laptop.jpg" },
  //   { "productId": 1003, "productName": "Mobile", "price": 95000, "image": "../assets/images/mobile.jpg" },
  //   { "productId": 1004, "productName": "Headphone", "price": 5000, "image": "../assets/images/headphone.jpg" },
  //   { "productId": 1005, "productName": "Harddisk", "price": 7000, "image": "../assets/images/harddisk.jpg" }
  // ];
  //products=[];
  constructor(private _router: Router,
    private _authService: AuthService,
    private _service: ProductApiService,
    private t: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.products = this._productService.getAllProucts();
    this._service.getAllProducts().subscribe(data => {
      console.log(data); 
      this.apiResponse=data;
      this.products = this.apiResponse.data;
      // this.products.forEach((product: any) => {
      //   this.productInventory.forEach((inventory: any) => {
      //     if (product.productId === inventory.productId) {
      //       product.quantityInStock = inventory.quantityInStock;
      //     }
      //   });
      // });
    });

    this._service.allCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });

    // this._authService.getProductInventories().subscribe(data => {
    //   // console.log(data);
    //   this.productInventory = data;
    //   console.log(this.productInventory);
    // });
    this.getProductInventories();

    // if (this.products && this.productInventory) {
    //   this.products.forEach((product: any) => {
    //     if (product.quantityInStock > 0) {
    //       this.msg = "In stock";
    //     }

    //   });
    // }

  }
  getProductInventories() {
    this._authService.getProductInventories().subscribe(data => {
      console.log(data);
      this.productInventory = data;
      if (this.products && this.productInventory) {
        this.products.forEach((product: any) => {
          this.productInventory.forEach((inventory: any) => {
            if (product.productId === inventory.productId) {
              product.quantityInStock = inventory.quantityInStock;
            

              if (product.quantityInStock > 0) {
                if (product.quantityInStock === 1) {
                  product.msg = "Only " + product.quantityInStock + " left in stock";
                  product.textColor = "red"; // Set text color to red
                
                } else {
                  product.msg = "In stock";
                  product.textColor = "green"; // Set text color to green
                
                }
              } else {
                product.msg = "Currently unavailable";
                product.textColor = "red"; // Set text color to red
              
              }

              if (product.quantityInStock > 0 && product.quantityInStock != 1) {
                this.msg = "In stock";
              } else if (product.quantityInStock === 1  ) {
                this.msg = "only " + product.quantityInStock + " left in stock "
               
              }
              else {
                this.msg = "Currently unavailable"
               
              }

            }
          });

        });
      }
    });
  }
  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }
  getSearchResults() {
    var demo = new SearchPipe();
    this.products = demo.transform(this.products, this.searchBy);
    this.t.detectChanges();

  }
  changeSearch() {
    if (this.searchBy == "")
      this._service.getAllProducts().subscribe(data => { console.log(data); this.products = data });
    //  this.products=  this._service.getData().subscribe(data => { console.log(data); this.products = data });
  }


  sort(event: any) {
    switch (event.target.value) {
      case "Id":
        {
          this.products = this.products.sort((low: any, high: any) => low.productId - high.productId);
          break;
        }
      case "Low":
        {
          this.products = this.products.sort((low: any, high: any) => low.price - high.price);
          break;
        }

      case "High":
        {
          this.products = this.products.sort((low: any, high: any) => high.price - low.price);
          break;
        }

      case "Name":
        {
          return this.products.sort((a: any, b: any) => a.productName.localeCompare(b.productName));

        }

      default: {
        this.products = this.products.sort((low: any, high: any) => low.price - high.price);
        break;
      }

    }
    return this.products;

  }

  sortByCategoryName(event: any) {
    const categoryId = event.target.value;
    this._service.getProductsByCategoryName(categoryId).subscribe(data => { console.log(data); this.products = data 
      this.getProductInventories();
    });
    //location.reload();
  }

  getProduct(productId: number) {
    //  this._router.navigate(['/home']);
    this._router.navigate(['/getProduct/' + productId]);
  }


  // deleteProduct(productId: number) {
  //   this._service.deleteProductMongo(productId).subscribe(response => {
  //      this.decodedToken = response;
  //      this.msg=this.decodedToken.message;
  //     alert(this.msg);
  //   },
  //     error => {
  //       console.log(error);
  //       console.log(error.error.message);
  //       alert(error.error.message);
  //     }
  //   );
  //   // location.reload();
  // }

}
