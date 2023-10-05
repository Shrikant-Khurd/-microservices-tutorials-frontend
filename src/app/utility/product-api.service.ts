import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { IMainCategory } from './IMainCategory';
import { ISecondaryCategory } from './ISecondaryCategory';
import { ISubCategory } from './ISubCategory';
import { Product } from './Product';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private _httpClient: HttpClient) { }
  baseURL: string = "http://localhost:8082/product";
  getData(): Observable<Product> {
    return this._httpClient.get<Product>(this.baseURL + "/getAllProducts");//.pipe(filter(product => product.price > 10000));
  }

  addProduct(product: any) {
    return this._httpClient.post(this.baseURL + "/addProduct", product, { responseType: 'JSON' as 'text' }).pipe(
      catchError((err)=> {
      console.log("error caught in service")
      console.error(err);
      return throwError(err);}));
  }
  getProductById(productId: number): Observable<Product> {
    return this._httpClient.get<Product>(this.baseURL + "/byId/" + productId);
  }
  updateProduct(productId: number, prod: Product,image: FormData) {
    return this._httpClient.put(this.baseURL + "/" + productId,image);
  }
  deleteProduct(productId: number) {
    return this._httpClient.delete(this.baseURL + "/" + productId, { responseType: 'JSON' as 'text' });
  }

  handleError(error: HttpErrorResponse) {

  }

  addProduct1(productData: FormData) {
    return this._httpClient.post<string>(`${this.baseURL}/add`, productData, { responseType: 'text' as 'json' });
  }



  //MongoDb connection
  private baseUrl = 'http://localhost:8082/productMongo';
  private url = 'http://localhost:9191/api/product';
 

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

  


  getAllProducts(): Observable<any> {
    // return this._httpClient.get<Product[]>(this.baseUrl+"/get-products");
    return this._httpClient.get<any>(this.url+"/get-all-products" , this.httpOptionsGet);
  
  }

  addProductMongo(product: FormData) {
    // return this._httpClient.post<string>(`${this.url}/add-product`, product, { responseType: 'text' as 'json' });
    return this._httpClient.post<string>(`${this.url}/add-product`, product , this.httpOptionsPost);
  }

  getProductByProductId(productId: any): Observable<Product> {
    // return this._httpClient.get<Product>(this.baseUrl + "/byId/" + productId);
    return this._httpClient.get<Product>(this.url + "/getProductDetailsById/" + productId  , this.httpOptionsGet);
  }
  updateProductMongo(productId: number, product: FormData) {
    // return this._httpClient.post(this.baseUrl + "/update/" + productId,product,{ responseType: 'text' as 'json' });
    return this._httpClient.post(this.url + "/update/" + productId,product,this.httpOptionsPost);
  }
  deleteProductMongo(productId: number) {
    return this._httpClient.post(this.url + "/delete/" + productId,this.httpOptionsPost);
  }

// Product category

private catUrl = 'http://localhost:9191/api/category';
private allCat= 'http://localhost:9191/api/category/mainCategories';

allCategories(): Observable<IMainCategory[]> {
  return this._httpClient.get<IMainCategory[]>(this.allCat, this.httpOptionsGet);
  // return this._httpClient.get<Category>(this.catUrl + "/all/category", this.httpOptions);
}
getSubCategories(mainCategoryId: number): Observable<ISubCategory[]> {
  return this._httpClient.get<ISubCategory[]>(`${this.catUrl}/main-categories/${mainCategoryId}/sub-categories`);
}

getSecondaryCategories(subCategoryId: number): Observable<ISecondaryCategory[]> {
  return this._httpClient.get<ISecondaryCategory[]>(`${this.catUrl}/sub-categories/${subCategoryId}/secondary-categories`);
}

addCategory(category: any) {
  return this._httpClient.post(this.catUrl + "/add/mainCtegory", category,  this.httpOptionsGet);
  // return this._httpClient.post(this.catUrl + "/add/category", category, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
}
getCategoryById(categoryId: number): Observable<IMainCategory> {
  return this._httpClient.get <IMainCategory>(this.catUrl + "/mainCtegory/byId/" + categoryId,  this.httpOptionsGet);
}
updateCategory(categoryId: number, category: IMainCategory) {
  return this._httpClient.post(this.catUrl + "/mainCtegory/update/" + categoryId, category, this.httpOptionsPost);
}
deleteCategory(categoryId: number) {
  return this._httpClient.post(this.catUrl + "/mainCtegory/delete/" + categoryId,  this.httpOptionsPost);
}

getProductsByCategoryName(category:IMainCategory):Observable<IMainCategory>{
  return this._httpClient.get<IMainCategory>(this.url + "/category?category="+category);
}

  addProductMongoDB(product: Products, images: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    return this._httpClient.post<Products[]>(this.baseUrl+"/add-product", formData,{ responseType: 'text' as 'json' }).pipe(
      catchError((err)=> {
      console.log("error caught in service")
      console.error(err);
      return throwError(err);}));
   /* const req = new HttpRequest('POST', `${this.baseUrl}/add-product`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
  
    return this._httpClient.request(req).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          // Progress event handling
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event.type === HttpEventType.Response) {
          // Response event handling
          console.log('File(s) uploaded successfully!', event.body);
          return event.body;
        }
      })
    );*/
  }
 

  private orderUrl = 'http://localhost:7172/api/order';
  addOrder(product: any) {
    // return this._httpClient.post<string>(`${this.baseUrl}/add`, product, { responseType: 'text' as 'json' });
    return this._httpClient.post<string>(`${this.orderUrl}/add-order`, product, { responseType: 'text' as 'json' });
  }
  
}
