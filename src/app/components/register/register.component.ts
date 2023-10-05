import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utility/auth.service';
import { IAddress } from 'src/app/utility/IAddress';
import { ProductApiService } from 'src/app/utility/product-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `.alert-error{
      border-color:2px solid red;
      color:red;
   }`
  ]
})
export class RegisterComponent implements OnInit {

  /*  registerForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('')
  
  }
  );*/
  pwdPattern = "";
  userRoles: any;
  msg: any;

  constructor(private _fb: FormBuilder, private _service: AuthService,
    private _productService: ProductApiService,
    private _router: Router) { }

    add: IAddress[] | undefined;
    a:any;
    userAddress: any[] = [];
  registerForm: FormGroup = this._fb.group({
    firstName: ['', [Validators.required,Validators.minLength(3)]],
    lastName: ['', [Validators.required,]],// Validators.minLength(3)]],
    contactNumber: ['', [Validators.required,]],// Validators.minLength(10)]],
    email: ['', [Validators.required,]], //Validators.email]],
    password: ['', [Validators.required,]], //Validators.pattern('(!@#$%&*)')]],
    // roles: ['', [Validators.required]]
    addresses: this._fb.group({
      street: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      country: ['', [Validators.required,]],
      zipCode: ['', [Validators.required,]]
    })
    // addresses: this.userAddress,
    // addresses: this._fb.array([this.createAddress()]),
  });

  get address(): AbstractControl[] {
    return (this.registerForm.get('addresses') as FormArray).controls;
  }


  createAddress(): FormGroup {
    return this._fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
  }



  ngOnInit(): void {
    // this._service.getAllRoles().subscribe(data => {
    //   this.userRoles = data;
    //   console.log(this.userRoles);
    // });


  }

  register() {
    console.log('this is address object: ', this.registerForm.value.addresses);
    const paylod = this.registerForm.value;
    const transformedObject = {
      ...paylod,
      addresses: [paylod.addresses],
      
    };
    
    // console.log(this.registerForm.value);
    console.log('this is payload: ${transformedObject}', transformedObject);



   /* const formData = { ...this.registerForm.value };
    formData.addresses = formData.addresses.map((address: any) => {
      return {
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode
      };
    });*/
  
    // Send the transformed form data to the backend API
    // Replace the following line with your actual API call
    // console.log(formData);

    this._service.registration(transformedObject).subscribe(response => {
      console.log(response);

      this.msg = response;
      // var json = JSON.parse(response);
      // console.log(json);
      // this.msg = json.message;
      console.log(this.msg.message);
      alert(this.msg.message);

    },
      error => {
        console.log(error.error);
        console.log(error.error.message);
        console.log('Error: ' + error.message);
      }
    );
  }
  
}


