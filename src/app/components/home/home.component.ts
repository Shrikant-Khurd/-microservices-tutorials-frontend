import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IAddress } from 'src/app/utility/IAddress';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { Products } from 'src/app/utility/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // addresses: any;

  addresses: IAddress[] = [];
  sortedAddresses: IAddress[] = [];
  msg: string = "";
  data: any;

  constructor(private _fb: FormBuilder, private _router: Router, private _service: ProductApiService, private sanitizer: DomSanitizer, private service: AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllAddresses();
  }
  pageNumber: number = 0;

  productDetails = [];



  getProduct(productId: number) {
    //  this._router.navigate(['/home']);
    this._router.navigate(['/getProduct/' + productId]);
  }
  getAllProducts(): void {
    // this._service.getAllProducts().subscribe(
    //   products => {
    //     this.products = products;
    //     console.log(products);

    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );
    // this._service.getAllProducts().subscribe(data => { console.log(data); this.addresses = data });
  }

  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }

  getImgUrl(imageUrl: string): SafeUrl {
    const sanitizedUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    return sanitizedUrl;
  }

  getImg(imageUrl: string): string {
    console.log(imageUrl);

    return 'http://localhost:9191' + imageUrl; // Replace with the actual base URL of your Spring Boot API
  }





  addAddressForm: FormGroup = this._fb.group({
    street: ['', [Validators.required,]],
    city: ['', [Validators.required,]],
    state: ['', [Validators.required,]],
    country: ['', [Validators.required,]],
    zipCode: ['', [Validators.required,]]

  });

  addAddress() {
    console.log(this.addAddressForm.value);

    this.service.addNewAddress(this.addAddressForm.value).subscribe(response => {
      this.data = response;
      this.msg = this.data.message;
      console.log(this.msg);

      alert(this.msg);
      console.log(response);

    })
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

  editMyAddress(addressId: number) {
    this._router.navigate(['/getAddress/' + addressId]);
  }

  removeMyAddress(addressId: number) {
    this.service.removeMyAddress(addressId).subscribe(response => {

      this.data = response;
      this.msg = this.data.message;

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
  setAsDefaultUserAddress(addressId: any) {
    this.service.setAsDefaultUserAddress(addressId).subscribe(response => {

      this.data = response;
      this.msg = this.data.message;
      console.log(this.msg);

      alert(this.msg);
      window.location.reload();
    },
      error => {
        console.log(error);
        console.log(error.error.message);

        alert(error.error.message);
      }
    );
  }
}
