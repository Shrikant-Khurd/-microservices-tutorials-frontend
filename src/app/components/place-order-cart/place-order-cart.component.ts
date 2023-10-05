import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IAddress } from 'src/app/utility/IAddress';
import { IOrderDetails } from 'src/app/utility/IOrderDetails';
import { IUserCart } from 'src/app/utility/IUserCart';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';

@Component({
  selector: 'app-place-order-cart',
  templateUrl: './place-order-cart.component.html',
  styleUrls: ['./place-order-cart.component.scss']
})
export class PlaceOrderCartComponent implements OnInit {

  id: any;
  apiReposnse: any;
  addresses: IAddress[] = [];
  sortedAddresses: IAddress[] = [];
  msg: string = "";
  data: any;
  userCart: IUserCart[] = [];
  demo: any;
  productDetails: Product[] = [];
  // orderDetails: IOrderDetails[] = [];
  // order!: IOrderDetails;
  productQuantity: any;
  p!: Product;
  selectedQuantity: number = 1; // Default selected quantity
  isSingleProductCheckout: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _service: ProductApiService,
    private _fb: FormBuilder,
    private _router: Router,
    private service: AuthService) { }

  ngOnInit(): void {
    const response = this._activatedRoute.snapshot.data['productDetails'];
    this.productQuantity = this._activatedRoute.snapshot.paramMap.get("productQuantity");
    this.isSingleProductCheckout = this._activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails = response.data;
    console.log(response);
    console.log("Before transform data :", this.productDetails);

    // this.demo = transformedObject;
    // const transformedObj = {
    //   ...this.demo[0],
    //   quantity: this.productQuantity
    // };
    let transformedObj: any;
    if (this.isSingleProductCheckout == "true") {
      // Transform the first item and add 'quantity' property
      transformedObj = {
        ...this.productDetails[0],
        quantity: this.productQuantity
      };

      this.productDetails = [transformedObj];
    } else {
      this.productDetails.forEach((cart: any) => {
        cart.cartLineProduct.quantity = cart.quantity;
      });

      console.log("apply cart quantity to product quantity:", this.productDetails);


      this.productDetails = this.productDetails.map((item: any) => item.cartLineProduct).flat();
      console.log("add cart line products in product details array : ", this.productDetails)
    }

    console.log("product : ", this.demo)
    console.log("transformedObj product single product details : ", transformedObj)

    this.getAllAddresses();

  }
  getAllAddresses() {
    this.service.getAllAddresses().subscribe(data => {
      const response = data;
      this.addresses = response.data;
      this.data = response.data;
      // this.addresses = response.data;
      // console.log("Address Array :", this.addresses);


      if (this.addresses && this.addresses.length > 0) {
        const defaultAddress = this.addresses.find((address: IAddress) => address.defaultAddress);
        if (defaultAddress) {
          this.sortedAddresses.push(defaultAddress);
        }
        // this.sortedAddresses.push(...this.addresses.filter((address: IAddress) => address !== defaultAddress));
        this.sortedAddresses.push(...this.addresses.filter((address: IAddress) => !address.defaultAddress));
      }
      // console.log("Sorted address :", this.sortedAddresses);

      this.demo = this.sortedAddresses[0];
      this.demo = this.demo.street + ', ' + this.demo.city + ', ' +
        this.demo.state + ', ' + this.demo.zipCode + ', ' + this.demo.country
      // console.log("Demo address ", this.demo);

    })
  }

  addProductForm: FormGroup = this._fb.group({


    shippingAddress: [''],
    orderLineProductList: ['']
  }
  );

  public placeOrder() {

    const paylod = this.addProductForm.value;
    console.log(paylod.shippingAddress);


    console.log("add product form data : ", paylod);

    const transformedObject = {
      ...paylod,
      orderLineProductList: this.productDetails,
      shippingAddress: { id: paylod.shippingAddress },
      // shippingAddress:paylod.shippingAddress,

    };

    console.log("data :  ", transformedObject);
    this.service.placeOrder(this.isSingleProductCheckout, transformedObject).subscribe(response => {
      console.log(response);
      this.data = response;
      this.msg = this.data.message;
      alert(this.msg);
    },
      error => {
        console.log(error.error);
        console.log(error.error.message);
        console.log('Error: ' + error.message);
      }
    );
    // this.service.orderPlace(transformedObject).subscribe(response => {
    //   console.log(response);
    //   this.data = response;
    //   this.msg = this.data.message;
    //   alert(this.msg);
    // },
    //   error => {
    //     console.log(error.error);
    //     console.log(error.error.message);
    //     console.log('Error: ' + error.message);
    //   }
    // );


    // this.service.orderPlace(this.orderDetails).subscribe(
    //   (resp: any) => {
    //     console.log(resp);
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
  }

  removeProduct(productId: any) {
    this.productDetails = this.productDetails.filter((product) => product.productId !== productId);
    this.service.removeProductFromOrder(productId).subscribe(
      response => {
        this.data = response;
        console.log(this.data.message);
        alert(this.data.message);
      }
    );
  }

  // incrementQuantity(product: Product): void {
  //   product.quantity++;
  // }

  incrementQuantity(product: Product) {
    let quantity;
    let maxQuantity = 5;
    if (product.quantity < maxQuantity) {
      product.quantity++;
      quantity = product.quantity;
      if (this.isSingleProductCheckout == "false") {
        this.service.udateCartProductQuantityAndCartStatus(product.productId, quantity,true).subscribe(
          response => {
            this.apiReposnse = response;
            console.log( this.apiReposnse.data.quantity);
          }
        );
      }

    }
  }

  decrementQuantity(product: Product): void {
    let quantity;
    if (product.quantity > 1) {
      product.quantity--;
      quantity = product.quantity;
      if (this.isSingleProductCheckout == "false") {
        this.service.udateCartProductQuantityAndCartStatus(product.productId, quantity,true).subscribe(
          response => {
            this.apiReposnse = response;
            console.log( this.apiReposnse.data.quantity);
          }
        );
      }
    }
  }



  getCalculatedTotal(productId: any, price: number) {
    const filteredProduct = this.productDetails.filter(
      (productQuantity: { productId: any; }) => productQuantity.productId === productId
    );
    // console.log("updated product quantity : ",this.productDetails);

    return filteredProduct[0].quantity * price;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.productDetails.forEach(
      (productQuantity: { productId: number; quantity: number; }) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].price;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    // console.log(grandTotal);
    return grandTotal;
  }
  createTransactionAndPlaceOrder(orderForm: NgForm) {
    //let amount = this.getCalculatedGrandTotal();

  }
}
