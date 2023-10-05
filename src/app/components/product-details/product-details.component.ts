import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IUserCart } from 'src/app/utility/IUserCart';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IInventory } from 'src/app/utility/IInventory';
import { IInventoryRequest } from 'src/app/utility/IInventoryRequest';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 2 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: any;
  selectedQuantity: number = 1; // Default selected quantity
  inStockQuantity!: number;
  demo: any;
  productInventory!: IInventory;
  inventory:any
  pro!:Product;

  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _service: ProductApiService,
    private authservice: AuthService,
    private _fb: FormBuilder,
    private elementRef: ElementRef,
    private _router: Router,) { }


  selectedSize: string | null = null;

  // ...

  selectSize(size: string): void {
    this.selectedSize = size;
    console.log(this.selectedSize);
    
  }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("id " + this.id);
      //  this.product=this._productService.getByid(this.id);
      //  this.product=this._service.getProductById(this.id);

    })
    this._service.getProductByProductId(this.id).subscribe(response => {
      console.log(response);
      this.product = response;
      this.pro=response;
      // this.inStockQuantity = this.product.quantityInStock;
      // console.log(this.inStockQuantity);
    });
    // this._service.getProductById(this.id).subscribe(response=>{ console.log(response);this.product=response});
    // console.log(this.product);

    // this.authservice.getproductInventoryDetailByProductId(this.id).subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.productInventory = response;
    //     this.product.quantityInStock = this.productInventory.quantityInStock;
    //     this.inStockQuantity = this.product.quantityInStock;

    //     if (this.product.quantityInStock > 0) {
    //       if (this.product.quantityInStock === 1) {
    //         this.product.msg = "Only " + this.product.quantityInStock + " left in stock";
    //         this.product.textColor = "red"; // Set text color to red
    //       } else {
    //         this.product.msg = "In stock";
    //         this.product.textColor = "green"; // Set text color to green
    //       }
    //     } else {
    //       this.product.msg = "Currently unavailable";
    //       this.product.descriptionMessage = "We Don't know when or if this item will be back in stock.";
    //       this.product.textColor = "red"; // Set text color to red
    //     }
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    this.authservice.inventoryDetailByProductId(this.id).subscribe(
      (response) => {
        this.inventory = response;
       console.log(this.inventory);
       console.log("product size array: ",this.product?.sizes);
       console.log(this.pro);
       this.product.sizes=[];
       
       this.inventory.inventoryDetail.forEach((item :any) => {
          this.product.sizes.push(item.size);        
      });
      console.log("after adding inventory size into product size array: ",this.product?.sizes);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }
  showPopover: boolean = false;
  incrementQuantity() {
    let maxQuantity = 5;
    if (this.selectedQuantity < maxQuantity) {
      this.selectedQuantity++;
    }
    // else if (this.selectedQuantity < this.inStockQuantity) {
    //   this.selectedQuantity++;
    // }
    else {
      this.showPopover = true;
      setTimeout(() => {
        this.showPopover = false;
      }, 2000);
    }
  }

  decrementQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }



  // addresses: any;
  addToCart(productDetails: Product) {
    const myCart = {
      cartLineProduct: productDetails,
      quantity: this.selectedQuantity // Use the selected quantity from the class variable
    };
    this.selectedQuantity = myCart.quantity;
    console.log(this.selectedQuantity);


    console.log("myCart: ", myCart);

    console.log(productDetails);
    this.authservice.addToCart(myCart).subscribe(
      response => {
        console.log(response.message);
        alert(response.message);
      }
    );
    this.authservice.updateTotalQuantities(this.selectedQuantity);
  }
  // updateTotalQuantities() {
  //   let totalQuantities = 0;
  //   for (const cartItem of this.userCart) {
  //     if (cartItem.cartSelected) {
  //       totalQuantities += cartItem.quantity;
  //     }
  //   }
  //   this.authservice.updateTotalQuantities(totalQuantities);
  // }
  addOrder(productId: any) {
    console.log(this.selectedQuantity);


    this._router.navigate(['/placeOrderCart', { isSingleProductCheckout: true, productQuantity: this.selectedQuantity, id: productId }]);
    // const encodedProduct = encodeURIComponent(JSON.stringify(product));
    // this._router.navigate(['/placeOrder', encodedProduct]);



  }


}
