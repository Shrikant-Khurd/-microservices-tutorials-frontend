import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  id: any;
  msg: string = "";
  data: any;
  address: any;
  constructor(private _activatedRoute: ActivatedRoute,private _fb: FormBuilder, private _service: AuthService, private _router: Router) { }


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("id " + this.id);
      //  this.product=this._productService.getByid(this.id);
      //  this.product=this._service.getProductById(this.id);
     
    })
    
    // this._service.getProductById(this.id).subscribe(response=>{this.product=response});
    this._service.getAddressByAddressId(this.id).subscribe(response => { 
      this.data = response 
      this.address=this.data.data;
      console.log(this.address);
    },
    error => {
      console.log(error);
      console.log(error.error.message);
      
      alert(error.error.message);
      }
    );
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

    this._service.editAddress(this.id,this.editAddressForm.value).subscribe(response => {
      this.data = response;
      // this.msg = this.data.message;
      console.log(this.data.message);

      alert(this.data.message);
      console.log(response);

    })
  }

}
