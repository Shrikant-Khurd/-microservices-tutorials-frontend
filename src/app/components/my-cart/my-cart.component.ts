import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IInventory } from 'src/app/utility/IInventory';
import { IUserCart } from 'src/app/utility/IUserCart';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  id: any;
  msg: string = "";
  apiReposnse: any;
  inStockQuantity!: number;
  productInventory!: IInventory;
  // userCart: IUserCart[] = [];
  userCart!: IUserCart[];
  demo: any;
  totalQuantity: number = 0;
  proceedToBuyDisabled!: boolean;

  constructor(private cdRef: ChangeDetectorRef, private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder, private _service: AuthService,
    private _router: Router, private cdr: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.getUserCart();
    // this.changeStatusOfProduct();

    // this.userCart.forEach((cartItem: IUserCart) => {
    //   if ( cartItem.cartLineProduct.quantityInStock > 0) {
    //       this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, false).subscribe(
    //         response => {
    //           this.apiReposnse = response;  
    //           // this.userCart = this.apiReposnse.data;
    //           console.log(this.apiReposnse.data);
    //         });
    //       }
    // });
  }

  getProductInventoryQuantity(productId: any) {
    this.demo = this._service.getproductInventoryDetailByProductId(productId).subscribe(
      (response) => {
        console.log(response);
        this.productInventory = response;
        this.demo = response;
        console.log("User Cart details from getProductInventoryQuantity method : ", this.userCart);

        // this.product.quantityInStock=this.productInventory.quantityInStock;

        this.userCart.forEach((cartItem: IUserCart) => {
          if (cartItem.cartLineProduct.productId === this.productInventory.productId) {
            this.inStockQuantity = this.productInventory.quantityInStock;
            console.log("In stock product quantity : ", this.inStockQuantity);

            cartItem.cartLineProduct.quantityInStock = this.inStockQuantity;
            console.log(cartItem.cartLineProduct);


            // if ( cartItem.cartLineProduct.quantityInStock > 0) {
            //   this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, false).subscribe(
            //     response => {
            //       this.apiReposnse = response;  
            //       // this.userCart = this.apiReposnse.data;
            //       console.log(this.apiReposnse.data);
            //     });
            //   }

            if (this.productInventory.quantityInStock > 0 || cartItem.cartLineProduct.quantityInStock > 0) {
              if (this.productInventory.quantityInStock === 1) {
                cartItem.msg = "Only " + this.inStockQuantity + " left in stock";
                cartItem.textColor = "red"; // Set text color to red

                console.log(cartItem.msg);

              } else {
                cartItem.msg = "In stock";
                cartItem.textColor = "green"; // Set text color to green
                console.log(cartItem.msg);
              }
            } else {
              this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, false).subscribe(
                response => {
                  this.apiReposnse = response;
                  // this.userCart = this.apiReposnse.data;
                  console.log(this.apiReposnse.data);
                });
              cartItem.msg = "Currently unavailable";
              cartItem.textColor = "red"; // Set text color to red
              console.log(cartItem.msg);
            }
          }
        });
        // if (this.productInventory.quantityInStock > 0) {
        //   if (this.productInventory.quantityInStock === 1) {
        //     this.demo.msg = "Only " + this.demo.quantityInStock + " left in stock";
        //     this.demo.textColor = "red"; // Set text color to red
        //     this.msg = "Only " + this.demo.quantityInStock + " left. Order now.";
        //     console.log(this.msg);

        //   } else {
        //     this.demo.msg = "In stock";
        //     this.demo.textColor = "green"; // Set text color to green
        //     this.msg = "In stock";
        //     console.log(this.msg);
        //   }
        // } else {
        //   this.demo.msg = "Currently unavailable";
        //   this.demo.textColor = "red"; // Set text color to red
        //   this.msg = "Currently unavailable";
        //   console.log(this.msg);
        // }

      },
      (error) => {
        console.error(error);
      }
    );
  }
  changeStatusOfProduct() {
    this.getUserCart();
    console.log("changeProductStatus : ", this.userCart);

    this.userCart.forEach((cartItem: IUserCart) => {
      if (cartItem.cartLineProduct.quantityInStock > 0) {
        this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, false).subscribe(
          response => {
            this.apiReposnse = response;
            // this.userCart = this.apiReposnse.data;
            console.log(this.apiReposnse.data);
          });
      }
    });
  }

  getProductDetails(productId: number) {
    //  this._router.navigate(['/home']);
    this._router.navigate(['/getProduct/' + productId]);
  }
  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }

  getUserCart() {
    this._service.getAllCartItems().subscribe(data => {
      this.apiReposnse = data;
      console.log(this.apiReposnse);

      this.userCart = this.apiReposnse.data;
      const userCarts = this.apiReposnse.data;
      // this.selectedQuantity=this.userCart.quantity
      this.msg = this.apiReposnse.message;
      console.log("User Cart details from getUserCart method : ", this.userCart);
      const cart = userCarts;
      // console.log('type of is cart selected: ', cart[0].cartSelected);

      const cartDetails = this.userCart ? this.userCart.length : 0;
      this.id = cartDetails;
      console.log("User Cart Length :", this.id);
      // console.log("Cart length is equal to 1 : ", this.userCart[0].cartSelected);

      if (this.userCart) {

        this.userCart.forEach((cartItem: IUserCart) => {
          //cartItem.cartSelected = true;
          this.getProductInventoryQuantity(cartItem.cartLineProduct.productId);

          // if (cartItem) {
          //   console.log("In stock product quantity from getUserCart method : ", cartItem.cartLineProduct.productId);

          // }
        });
      }
      if (this.userCart && this.userCart.length === 1) {
        let cartProductId = this.userCart[0].cartLineProduct.productId;
        console.log("Cart length is equal to 1 (in if statement): ", this.userCart[0].cartSelected);
        console.log("Cart line product : ", this.userCart[0].cartLineProduct);

        console.log(" cart product id ;", cartProductId);


        // if (this.userCart[0].cartLineProduct.quantityInStock > 0) {
          this._service.udateCartProductQuantityAndCartStatus(cartProductId, 0, true).subscribe(
            response => {
              console.log(response);

              this.apiReposnse = response;

              // this.userCart = this.apiReposnse.data;
              console.log(this.apiReposnse.data);

              //   window.location.reload();

            });
        // }
      }

    },
      (error) => {
        // Handle circuit breaker fallback response or other errors

        if (error.status === 0) {
          // CORS issue or network connectivity problem
          console.log('Cart Service is down! Please try later');

        }
        // if (error.httpStatusCode === 503) {
        //   console.log('Custom error:', error.message);
        //   // Handle custom error response
        // } else {
        //   console.log('Other error:', error);
        //   // Handle other errors
        // }
      })

  }

  removeFromCart(cartId: number) {
    console.log(cartId);
    this._service.removeItemFromCart(cartId).subscribe(
      response => {
        this.apiReposnse = response;
        console.log(this.apiReposnse.message);
        alert(this.apiReposnse.message);
        // setTimeout(() => {
        this.getUserCart();
        window.location.reload();
        // }, 1000);
      });

  }

  totalQuantities() {
    // let totalQuantities = 0;
    this.totalQuantity = 0;
    for (const cartItem of this.userCart) {

      if (cartItem.cartSelected) {
        this.totalQuantity += cartItem.quantity;
      }
      //this.num= this.totalQuantity;
      // else if (cartItem.cartSelected) {
      //   totalQuantities -= cartItem.quantity;
      // }
      // if (cartItem.userId===4) {
      //   this._service.updateTotalQuantities(this.totalQuantity);
      // }
    }
    this._service.updateTotalQuantities(this.totalQuantity);
    if (this.totalQuantity === 0) {
      this.proceedToBuyDisabled = true;
    }
    else {
      this.proceedToBuyDisabled = false;
    }
    console.log(this.totalQuantity);
    if (this.totalQuantity <= 1) {
      return this.totalQuantity + " item";
    }
    else {
      return this.totalQuantity + " items";
    }

  }

  calculateSubtotal(): number {
    let subtotal = 0;
    for (const cartItem of this.userCart) {
      // subtotal += cartItem.cartLineProduct.price * cartItem.quantity;
      if (cartItem.cartSelected) {
        subtotal += cartItem.cartLineProduct.price * cartItem.quantity;
      }
    }
    return subtotal;


  }

  // updateTotalQuantity() {
  //   this.totalQuantity = this.userCart.reduce((total, cartItem) => {
  //     return cartItem.cartSelected ? total + cartItem.quantity : total;
  //   }, 0);
  //   this.cdr.detectChanges(); // Manually trigger change detection
  //  // this.proceedToBuyDisabled = this.totalQuantity === 0;
  // }

  toggleCartItemSelection(cartItem: IUserCart) {

    console.log('cart item selected: ', cartItem);

    // when cart item is unselected 
    if (cartItem.cartSelected) {
      console.log("before updating cart status( true) : ", cartItem.cartSelected);
      const previousSelectedStatus = cartItem.cartSelected;
      cartItem.cartSelected = !previousSelectedStatus;
      console.log(11);

      // cartItem.cartSelected = false;//!cartItem.cartSelected;
      console.log("updated cart status false: ", cartItem.cartSelected);

      this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, cartItem.cartSelected).subscribe(
        response => {
          this.apiReposnse = response;

          console.log('this is response: ', this.apiReposnse);

        }
      );

      this.calculateSubtotal();
      console.log(" sdgggsg ", cartItem);

    }
    else {
      console.log("before updating cart status (false): ", cartItem.cartSelected);
      console.log(22);

      const previousSelectedStatus = cartItem.cartSelected;
      cartItem.cartSelected = !previousSelectedStatus;

      console.log("updateddd cart status true: ", cartItem.cartSelected);
      this._service.udateCartProductQuantityAndCartStatus(cartItem.cartLineProduct.productId, 0, cartItem.cartSelected).subscribe(
        response => {
          this.apiReposnse = response;

          console.log(this.apiReposnse);
        }
      );

      this.calculateSubtotal();
    }
    // this.calculateSubtotal();
  }



  // incrementQuantity(userCart: IUserCart): void {
  //   userCart.quantity++;
  // }
  showPopover: boolean = false;
  incrementQuantity(userCart: IUserCart) {
    let quantity;
    let maxQuantity = 5;
    if (userCart.quantity < maxQuantity) {
      userCart.quantity++;
      quantity = userCart.quantity;
      console.log("dsgsgs", userCart.cartLineProduct.productId);

      this._service.udateCartProductQuantityAndCartStatus(userCart.cartLineProduct.productId, quantity, true).subscribe(
        response => {
          this.apiReposnse = response;
          console.log(this.apiReposnse.data.quantity);
        }
      );
    } else {
      this.showPopover = true;
      setTimeout(() => {
        this.showPopover = false;
      }, 3000);
    }
  }
  decrementQuantity(userCart: IUserCart): void {
    let quantity;
    if (userCart.quantity > 1) {
      userCart.quantity--;
      quantity = userCart.quantity;
      this._service.udateCartProductQuantityAndCartStatus(userCart.cartLineProduct.productId, quantity, true).subscribe(
        response => {
          this.apiReposnse = response;
        }
      );
    }
  }


  checkout() {
    this._router.navigate(['/placeOrderCart', { isSingleProductCheckout: false, id: 0 }]);
  }
}
