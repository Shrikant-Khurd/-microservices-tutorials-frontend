import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IInventory } from 'src/app/utility/IInventory';
import { IUsers } from 'src/app/utility/IUsers';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { SearchPipe } from 'src/app/utility/search.pipe';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  id: any;
  msg: string = "";
  data: any;
  address: any;
  userDetail!:IUsers;

  searchBy: string = "";
  // products: any[] = [];
  products: any;
  apiResponse:any;
  categories: any;
  decodedToken: any;
  productId: any;
  productInventory!: IInventory;
  editedQuantity: any;
  showEditQuantity: boolean = false;


  constructor(private _activatedRoute: ActivatedRoute, private _fb: FormBuilder,
    private _service: AuthService, private _router: Router,
    private productService: ProductApiService,
    private t: ChangeDetectorRef) { }


  ngOnInit(): void {
    //this.products = this._productService.getAllProucts();
    this.productService.getAllProducts().subscribe(data => { 
      console.log(data); 
      this.apiResponse=data;
      this.products = this.apiResponse.data;
    
    });
    //  this._service.getData().subscribe(data => { console.log(data); this.products = data });
    this.productService.allCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });


  }
  getProductInventories() {
    this._service.getProductInventories().subscribe(data => {
      console.log(data);
    });
  }
  getInventoryOfProduct() {
    if (this.productId) {
      this._service.getproductInventoryDetailByProductId(this.productId).subscribe(
        (response) => {
          console.log(response);

          this.productInventory = response;
          this.editedQuantity = this.productInventory.quantityInStock;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }


  saveEditedQuantity() {
    this._service.updateProductQuantityStockInInventory(this.productInventory).subscribe(
      (response) => {
        console.log(response);

        // this.productInventory = response;

      },
      (error) => {
        console.error(error);
      }
    );
    console.log("Updated Quantity in Stock:", this.productInventory.quantityInStock);
    this.showEditQuantity = false; // Hide the input field after saving
  }

  cancelEditQuantity() {
    this.showEditQuantity = false; // Hide the input field without saving
  }

  editAddressForm: FormGroup = this._fb.group({
    street: ['', [Validators.required,]],
    city: ['', [Validators.required,]],
    state: ['', [Validators.required,]],
    country: ['', [Validators.required,]],
    zipCode: ['', [Validators.required,]]

  });




  editAddress() {
    console.log(this.editAddressForm.value);

    this._service.editAddress(this.id, this.editAddressForm.value).subscribe(response => {
      this.data = response;
      // this.msg = this.data.message;
      console.log(this.data.message);

      alert(this.data.message);
      console.log(response);

    })
  }

  myAddress() {
    this._service.getAllAddresses().subscribe(data => {
      console.log(data);
     
      

    })
  }

  userDetails() {
    this._service.userDetails().subscribe(data => {
      console.log(data);
      this.userDetail= data;


    })
    this._service.getCurrentUserRole().subscribe(data => {
      console.log(data);

    })
  }

  getAllUserOrders() {
    this._service.allOrdersOfUser().subscribe(data => {
      console.log(data);

    })
  }
  getUserCart() {
    this._service.getAllCartItems().subscribe(data => {
      console.log(data);

    })
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
      this.productService.getAllProducts().subscribe(data => { console.log(data); this.products = data });
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
    this.productService.getProductsByCategoryName(categoryId).subscribe(data => { console.log(data); this.products = data });
    //location.reload();
  }

  getProduct(productId: number) {
    //  this._router.navigate(['/home']);
    this._router.navigate(['/getProduct/' + productId]);
  }

  // updateProduct(productId:number){

  // }
  deleteProduct(productId: number) {
    this.productService.deleteProductMongo(productId).subscribe(response => {

      this.decodedToken = response;
      this.msg = this.decodedToken.message;

      alert(this.msg);
    },
      error => {
        console.log(error);
        console.log(error.error.message);

        alert(error.error.message);
      }
    );
    // location.reload();
  }
}
