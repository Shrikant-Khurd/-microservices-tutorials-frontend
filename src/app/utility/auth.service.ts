import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IAddress } from './IAddress';
import { IInventory } from './IInventory';
import { IUserCart } from './IUserCart';
import { IUserRole } from './IUserRole';
import { IUsers } from './IUsers';
import { LoginRequest } from './LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  baseURL: string = "http://localhost:9191/api/auth";


  httpOptionsPost = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular application URL
    }),
    responseType: 'text' as 'json'
  };
  httpOptionsGet = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200' // Replace with your Angular application URL
    }),
    // responseType: 'text' as 'json'
  };



  // get all roles
  getAllRoles(): Observable<IUserRole> {
    return this._httpClient.get<IUserRole>(`${this.baseURL}/roles`, this.httpOptionsGet);
    // return this._httpClient.get<Category>(this.catUrl + "/all/category", this.httpOptions);
  }

  // user registration 
  registration(userDetails: any) {
    // return this._httpClient.post<any>(`${this.baseURL}/register`, userDetails , this.httpOptionsGet);
    return this._httpClient.post(this.baseURL + "/register", userDetails, this.httpOptionsGet);
  }

  // get current user detail which isloggedin
  getCurrentUser(): Observable<IUsers> {
    return this._httpClient.post<any>(`${this.baseURL}/current-user`, this.httpOptionsPost).pipe(map((response) => {
      // sessionStorage.setItem('user', request.email);
      // sessionStorage.setItem('token', 'Bearer ' + response.accessToken);
      //console.log(sessionStorage.getItem('token'));
      /// console.log(response);
      let userRole = response.roles[0].roleName;
      console.log(response.email);

      //    sessionStorage.setItem('user',  response.roles[0].roleName);
      return response;
    }));

  }
  getCurrentUserRole(): Observable<IUserRole> {
    return this._httpClient.post<IUserRole>(`${this.baseURL}/current-userRole`, this.httpOptionsGet);

  }

  public getUserRole(){
    
  }

  // generate token 
  createJwtToken(loginRequest: LoginRequest): Observable<any> {
    // return this._httpClient.post(`${this.baseURL}/authenticate`, loginRequest, { responseType: 'JSON' as 'text' });
    return this._httpClient.post(`${this.baseURL}/authenticate`, loginRequest, this.httpOptionsGet);
  }

  createJwtToken1(request: LoginRequest): Observable<any> {
    return this._httpClient.post<any>(this.baseURL + '/authenticate', request, this.httpOptionsPost).pipe(map((response) => {
      // sessionStorage.setItem('user', request.email);
      // sessionStorage.setItem('token', 'Bearer ' + response.accessToken);
      //console.log(sessionStorage.getItem('token'));
      return response;
    }));
  }

  //login user: seet toekn in session or local storage
  public loginUser(token: any) {
    sessionStorage.setItem('token', token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = sessionStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //logout: remove token from session storage
  public logout() {
    sessionStorage.removeItem('token');
    return true;
  }

  // get token
  public getToken() {
    return sessionStorage.getItem('token');
  }




  decodeJwtToken(): any {
    //   const token = sessionStorage.getItem('token'); 
    //  // Retrieve the JWT token from local storage
    //  if (token) {
    //     return jwtDecode(token);
    //   } else {
    //     console.log('Token not found');
    //     return null;
    //   }
  }

  // user operations

  private url = 'http://localhost:9191/api/users';


  userDetails(): Observable<IUsers> {

    return this._httpClient.post<IUsers>(`${this.url}/get-user-by-id`, this.httpOptionsGet).pipe(map((response) => {
      console.log(" auth service : ", response); return response;
    }));
  }

  addNewAddress(address: any): Observable<any> {
    return this._httpClient.post<any>(`${this.url}/add-address`, address, this.httpOptionsGet);
  }

  getAllAddresses(): Observable<any> {
    return this._httpClient.get<any>(`${this.url}/user-addresses`, this.httpOptionsGet);
  }

  getAddressByAddressId(addressId: number): Observable<IAddress> {
    return this._httpClient.get<IAddress>(`${this.url}/addresses/${addressId}`, this.httpOptionsGet);
  }

  editAddress(addressId: number, address: IAddress): Observable<any> {
    return this._httpClient.post(`${this.url}/addresses/${addressId}`, address, this.httpOptionsGet);
  }

  setAsDefaultUserAddress(addressId: number): Observable<any> {
    return this._httpClient.post(`${this.url}/addresses/${addressId}/set-default`, this.httpOptionsGet);
  }

  removeMyAddress(addressId: number): Observable<any> {
    return this._httpClient.post(`${this.url}/addresses/${addressId}/delete`, this.httpOptionsGet);
  }

  // addNewAddress(address: any) {
  //   return this._httpClient.post<any>(`${this.url}/add-address`, address, this.httpOptionsGet);
  //   // return this._httpClient.post<IAddress>(`http://localhost:9191/api/user/add-address`,address, this.httpOptionsPost).pipe(map((response) => {
  //   //   console.log(response); return response;
  //   // }));
  // }
  // allAddresses(): Observable<any> {
  //   return this._httpClient.get<any>(`${this.url}/get-all-user-address`, this.httpOptionsGet);
  //   // return this._httpClient.post<IAddress>(`http://localhost:9191/api/user/add-address`,address, this.httpOptionsPost).pipe(map((response) => {
  //   //   console.log(response); return response;
  //   // }));
  // }

  // getAddressByAddressId(addressId: number) {
  //   return this._httpClient.get<IAddress>(this.url + "/address-detail/" + addressId, this.httpOptionsGet);
  // }

  // editAddress(addressId: number, address: IAddress) {
  //   return this._httpClient.post(this.url + "/update-address/" + addressId, address, this.httpOptionsGet);
  // }

  // setAsDefaultUserAddress(addressId: number) {
  //   return this._httpClient.post(this.url + "/set-as-default-address/" + addressId, this.httpOptionsGet);
  // }

  // removeMyAddress(addressId: number) {
  //   return this._httpClient.post(this.url + "/delete-address/" + addressId, this.httpOptionsGet);
  // }

  // ORDER operations

  private orderUrl = 'http://localhost:9191/api/order';


  allOrdersOfUser() {
    return this._httpClient.get<any>(`${this.orderUrl}/get-orders-by-userId`, this.httpOptionsGet);
  }

  orderPlace(order: any) {
   
     return this._httpClient.post<any>(`${this.orderUrl}/add-order`, order, this.httpOptionsGet);
    // return this._httpClient.post<IAddress>(`http://localhost:9191/api/user/add-address`,address, this.httpOptionsPost).pipe(map((response) => {
    //   console.log(response); return response;
    // }));
  }
  placeOrder(isCartCheckout: any,order: any) {
   
     return this._httpClient.post<any>(`${this.orderUrl}/add-order/${isCartCheckout}`, order, this.httpOptionsGet);
    // return this._httpClient.post<IAddress>(`http://localhost:9191/api/user/add-address`,address, this.httpOptionsPost).pipe(map((response) => {
    //   console.log(response); return response;
    // }));
  }

  // CART operations

  private cartUrl = 'http://localhost:9191/api/carts';


  private totalQuantitiesSource = new BehaviorSubject<number>(0);
  totalQuantities$ = this.totalQuantitiesSource.asObservable();


  
  updateTotalQuantities(totalQuantities: number) {
    this.totalQuantitiesSource.next(totalQuantities);
  }

  getProductDetails(productId: any): Observable<any> {
    // return this._httpClient.get<Product>(this.baseUrl + "/byId/" + productId);
    return this._httpClient.get<any>(this.cartUrl + "/getProductDetails/" + productId, this.httpOptionsGet);

    // return this._httpClient.get(this.cartUrl + "/getProductDetails/" + productId, this.httpOptionsGet).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === 503) {
    //       // Circuit breaker fallback response
    //       const fallbackResponse = {
    //         message: 'Product Service is down! Please try later',
    //         // You can include more properties from your response if needed
    //       };
    //       return throwError(fallbackResponse);
    //     } else {
    //       // Handle other errors as needed
    //       return throwError('Something went wrong');
    //     }
    //   })
    // );
  }

  addToCart(cart: any) {
    return this._httpClient.post<any>(`${this.cartUrl}/add-to-cart`, cart, this.httpOptionsGet);
  }
  getAllCartItems() {
    return this._httpClient.get<any>(`${this.cartUrl}/getCartDetails`, this.httpOptionsGet);
  }

  udateCartProductQuantityAndCartStatus(cartProductId:number, quantity:number, isCartSelected:boolean){
    return this._httpClient.post(`${this.cartUrl}/udateCartProductQuantityAndCartStatus?cartProductId=${cartProductId}&quantity=${quantity}&isCartSelected=${isCartSelected}`, this.httpOptionsGet);
    // return this._httpClient.post(`${this.cartUrl}/udateCartProductQuantityAndCartStatus/${cartProductId}/${quantity}`, this.httpOptionsGet);
  }

  removeItemFromCart(cartId: number) {
    return this._httpClient.post(this.cartUrl + "/deleteCartItem/" + cartId, this.httpOptionsGet);
  }
  removeProductFromOrder(productId: number) {
    return this._httpClient.post(this.cartUrl + "/removeProductFromOrderAndCart/" + productId, this.httpOptionsGet);
  }

  // inventory operations
  private inventoryUrl = 'http://localhost:9191/api/inventory';

  getProductInventories(){
    return this._httpClient.get<any>(`${this.inventoryUrl}/getProductsInventories`, this.httpOptionsGet);
  }

  getproductInventoryDetailByProductId(productId : any){
    return this._httpClient.get<any>(this.inventoryUrl + "/product-inventory/" + productId, this.httpOptionsGet);
  }

  updateProductQuantityStockInInventory( inventoryData:IInventory){
    return this._httpClient.post(`${this.inventoryUrl}/update-QuantityStock/productId`,inventoryData, this.httpOptionsGet);
  }
}
