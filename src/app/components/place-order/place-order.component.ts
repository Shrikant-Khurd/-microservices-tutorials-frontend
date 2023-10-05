import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IAddress } from 'src/app/utility/IAddress';
import { IOrderDetails } from 'src/app/utility/IOrderDetails';
import { IUserCart } from 'src/app/utility/IUserCart';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  id: any;
  product: any;
  addresses: IAddress[] = [];
  sortedAddresses: IAddress[] = [];
  msg: string = "";
  data: any;
  userCart: IUserCart[] = [];
  demo: any;

  orderDetails: Product[] = [];
  order!: IOrderDetails;

  selectedQuantity: number = 1; // Default selected quantity

  constructor(private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _service: ProductApiService,
    private _fb: FormBuilder,
    private _router: Router,
    private service: AuthService) { }

  ngOnInit(): void {
    this.demo = this._activatedRoute.snapshot.data['demo'];
    console.log(this.demo);

    this._activatedRoute.params.subscribe(params => {
      // this.id = params['id'];
      // console.log("id "+this.id);

      const decodedProduct = JSON.parse(decodeURIComponent(params['id']));
      this.id = decodedProduct;
      console.log(this.id);
    })
    this._service.getProductByProductId(this.id).subscribe(response => { console.log(response); this.product = response });
    // this._service.getProductById(this.id).subscribe(response=>{ console.log(response);this.product=response});
    // console.log(this.product);
    // this.getUserCart();
    this.getAllAddresses();

    

  }
  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }



  getAllAddresses() {
    this.service.getAllAddresses().subscribe(data => {
      const response = data;
      this.addresses = response.data;
      // this.addresses = response.data;
      console.log("Address Array :", this.addresses);


      if (this.addresses && this.addresses.length > 0) {
        const defaultAddress = this.addresses.find((address: IAddress) => address.defaultAddress);
        if (defaultAddress) {
          this.sortedAddresses.push(defaultAddress);
        }
        // this.sortedAddresses.push(...this.addresses.filter((address: IAddress) => address !== defaultAddress));
        this.sortedAddresses.push(...this.addresses.filter((address: IAddress) => !address.defaultAddress));
      }
      console.log("Sorted address :", this.sortedAddresses);
    })
  }

  getUserCart() {
    this.service.getAllCartItems().subscribe(data => {
      this.data = data;
      this.userCart = data.data;
      console.log("User Cart details : ", this.userCart);

      console.log(data);

    })
  }


  addProductForm: FormGroup = this._fb.group({


    shippingAddressId: [''],
    orderLineProductList: [''],
    quantity: [1]
    // image: [null, Validators.required]
  }
  );


  placeOrder() {
    console.log(this.addProductForm.value);
    const productData = this.addProductForm.value;
    this.product.quantity = productData.quantity;
    console.log(" product quantity : ", this.product.quantity);

    this.orderDetails = this.product;
    console.log(this.orderDetails);


    productData.orderLineProductList = [this.product];
    console.log(" sfdsfds ", productData.orderLineProductList);


    const paylod = this.addProductForm.value;
    const transformedObject = {
      ...paylod,
      orderLineProductList: [this.product],
    };

    console.log("data :  ", transformedObject);


    this.service.orderPlace(transformedObject).subscribe(response => {
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
  }

  getCalculatedTotal(price: number) {
    const quantity= this.addProductForm.controls['quantity'].value;
    return quantity * price;
  }
}
