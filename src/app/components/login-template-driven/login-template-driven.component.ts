import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/utility/auth.service';
import { IUserRole } from 'src/app/utility/IUserRole';
import { LoginResponse } from 'src/app/utility/LoginResponse';

@Component({
  selector: 'app-login-template-driven',
  templateUrl: './login-template-driven.component.html',
  styles: [
  ]
})
export class LoginTemplateDrivenComponent implements OnInit {
  loginReponse: LoginResponse | undefined;
  // loginReponse:any;
  decodedToken: any;
  role: IUserRole | undefined;
  // role:any;

  constructor(private _service: AuthService, private _router: Router) { }
  user = {
    emailOrContactNumber: "",
    password: ""
  }

  login(loginForm: NgForm) {

    this._service.createJwtToken(loginForm.value).subscribe(response => {
      console.log(response); this.loginReponse = response

      this._service.loginUser(response.accessToken);

      /* this._service.getCurrentUser().subscribe(
         (user: any) => {
          let userRole= user.roles[0].roleName;
           if (userRole == "ADMIN") {
             this._router.navigate(['/admin-dashboard']);
           }
           else if (userRole == "USER") {
             this._router.navigate(['/user-dashboard']);
           }
           else {
             this._service.logout();
           }
         }
       )*/
      this._service.getCurrentUserRole().subscribe(data => {
        this.role = data;
        console.log(this.role);
        // let userRole= this.role[0].roleName;
        let userRole = this.role.roleName;
        console.log(userRole);

        if (userRole == "ADMIN") {
          this._router.navigate(['/admin-dashboard']);
        }
        else if (userRole == "USER") {
          this._router.navigate(['/user-dashboard']);
        }
        else {
          this._service.logout();
        }

      });

      

    },
      error => {
        console.log(error);
        console.log(error.error);

        alert(error.error.message);
        /*   var json = JSON.parse(error.error);
           console.log("Error", json.message)
           alert(json.message);*/
      }
    );

    console.log(loginForm.value);

  }



  ngOnInit(): void {



    this.decodedToken = this._service.decodeJwtToken();
    // console.log(this.decodedToken);
  }

}
