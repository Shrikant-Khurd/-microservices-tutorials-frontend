import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IMainCategory } from 'src/app/utility/IMainCategory';
import { ISecondaryCategory } from 'src/app/utility/ISecondaryCategory';
import { IStockData } from 'src/app/utility/IStockData';
import { ISubCategory } from 'src/app/utility/ISubCategory';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-inventory.component.html',
  styles: [`
   .selected-size{
    border: 2px solid #2874f0!important;
    color: #2874f0!important;
    box-shadow: none;
  }
  .btn-size {
    font-size: 18px;
    color: #212121;
    min-width: 48px;
    height: 40px;
    text-align: center;
    border-radius: 0px;
  }`
  ]
})
export class AddInventoryComponent implements OnInit {

  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  sizeInNumbers: string[] = ['30', '32', '34', '36', '38'];
  selectSizeD: string[] = ['Sizes', 'Size In Numbers'];
  selSizeString: string | undefined;
  sizeQuantityPairs: IStockData[] = [];
  // sizeQuantityPairs: { size: string, quantityInStock: number }[] = [];
  selectedSize: string[] = [];

  sizeeee: string[] = [];


  apiResponse: any;
  msg: string = "";
  product: any;
  id: any;
  selectedFile: File | null = null;

  constructor(private _activatedRoute: ActivatedRoute, private _fb: FormBuilder,
    private _productService: ProductApiService,
    private _service: AuthService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    // const response = this._activatedRoute.snapshot.data['productDetails'];
    // console.log("Inventory product data: ", response);
    // this.apiResponse = response;
    // this.product = this.apiResponse.data[0];
    // console.log("Product Details: ", this.product);


    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("id " + this.id);
      //  this.product=this._productService.getByid(this.id);
      //  this.product=this._service.getProductById(this.id);

    })
    this._productService.getProductByProductId(this.id).subscribe(response => {
      console.log(response);
      this.product = response;
      // this.inStockQuantity = this.product.quantityInStock;
      // console.log(this.inStockQuantity);
    });

  }

  // Function to toggle the size
  toggleSize(size: string): void {
    if (this.selectedSize.includes(size)) {
      this.selectedSize = this.selectedSize.filter(s => s !== size);
      this.sizeQuantityPairs = this.sizeQuantityPairs.filter(pair => pair.size !== size);

    } else {
      this.selectedSize.push(size);
      this.sizeQuantityPairs.push({ size: size, quantityInStock: 0 });
    }
    console.log(this.selectedSize);

  }


  // Function to handle quantity change
  onQuantityChange(size: string, quantity: number): void {
    const pair = this.sizeQuantityPairs.find(p => p.size === size);
    if (pair) {
      pair.quantityInStock = quantity;
    }
    console.log("On change menthod", pair);
    console.log(this.sizeQuantityPairs);

  }

  onSizeChange(): void {
    this.selectedSize = [];
    this.sizeQuantityPairs = [];
    console.log(this.selSizeString);
    if (this.selSizeString === "Sizes") {
      this.sizeeee = this.sizes;
    }
    if (this.selSizeString === "Size In Numbers") {
      this.sizeeee = this.sizeInNumbers;
    }
    console.log('Selected sizeee :', this.sizeeee);
  }

  addInventoryForm: FormGroup = this._fb.group({

    productId: [''],
    sizeAndQuantity: [''],
    selectSizes: ['', Validators.required],
    sizeQauntityPair: ['', Validators.required]
  }
  );


  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }

  addProductInventory() {
    console.log(this.addInventoryForm.value);
    const productData = this.addInventoryForm.value;
    productData.productId = this.id;
    productData.sizeAndQuantity = this.sizeQuantityPairs;
    console.log(productData);

    // const formData = new FormData();
    // formData.append('productId', productData.productId);
    // formData.append('sizes', productData.sizes);

    this._service.addProductStock(productData).subscribe(
      response => {
        console.log(response);

        this.apiResponse = response;
        this.msg = this.apiResponse.message;

        // var json = JSON.parse(response);
        // console.log(json);
        // this.msg = json.message;
        console.log(this.msg);
        alert(this.msg);

      },
      error => {
        console.log('Error: ' + error.message);
      }
    );
    // setTimeout(() => {

    //   this._router.navigate(['/products']);
    // }, 1000);

  }




}
