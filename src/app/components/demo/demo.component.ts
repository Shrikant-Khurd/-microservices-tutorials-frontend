import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMainCategory } from 'src/app/utility/IMainCategory';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
i: any;
openDialog() {
throw new Error('Method not implemented.');
}
data:any;
products:any;
// categories!: Category;
categories: any;
msg: string = "";
constructor(private _fb: FormBuilder,
  private _productService: ProductService,
  private _service: ProductApiService,
  private _router: Router
) {
  // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
}

  addCategoryForm: FormGroup = this._fb.group({

    categoryName: ['', Validators.required]
  }
  );

  ngOnInit(): void {
    this._service.allCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
      
    });
    
  }

  addCategory(){
    this._service.addCategory(this.addCategoryForm.value).subscribe(response => {
       console.log(response);  
      this.data=response;
      // var json = JSON.parse(this.data);
      // console.log(json);
      // this.msg=json.message;
      // console.log(json.message);
      this.msg=this.data.message;
      console.log(this.msg);
      
      alert(this.msg);
      },
    error => {
      console.log(error);
      // var json = JSON.parse(error.error);
      // console.log(json);
      
      //  console.log("Error", json.message)
      //  alert(json.message)
     console.log(error.error);
     console.log(error.error.message);
      
     alert(error.error.message);
      }
    );
    // location.reload();
  }


  editCategory(categoryId: any){
    this._router.navigate(['/edit/' + categoryId]);
  }

  decodedToken: any;

  deleteCategory(categoryId:any){

    this._service.deleteCategory(categoryId).subscribe(response => {
     
      this.decodedToken = response;
      this.msg=this.decodedToken.message;

     alert(this.msg);
   },
     error => {
       console.log(error);
       console.log(error.error.message);

       alert(error.error.message);
     }
   );
   location.reload();
 }
}