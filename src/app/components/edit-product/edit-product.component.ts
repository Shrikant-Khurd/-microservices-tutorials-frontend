import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMainCategory } from 'src/app/utility/IMainCategory';
import { ISecondaryCategory } from 'src/app/utility/ISecondaryCategory';
import { ISubCategory } from 'src/app/utility/ISubCategory';
import { Product } from 'src/app/utility/Product';
import { ProductApiService } from 'src/app/utility/product-api.service';
import { ProductService } from 'src/app/utility/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  id: any;
  // product: any={};
  sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL'];
  selectedSize: string[] = [];
  mainCategories: IMainCategory[] = [];
  subCategories: ISubCategory[] = [];
  secondaryCategories: ISecondaryCategory[] = [];

  selectedMainCategory: any;
  selectedSubCategory: any;
  // selectedSecondaryCategory: any;
  // mainC!:IMainCategory;
  // subC!:ISubCategory;
  // secondC!:ISecondaryCategory;

  mainCat: any;
  subCat: any;
  secondCat: any;

  product: any = { category: { categoryId: null } };
  apiResponse: any;
  categories: any;
  // product:Product | undefined;
  selectedFile: File | null = null;

  constructor(private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _service: ProductApiService,
    private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log("id " + this.id);
      //  this.product=this._productService.getByid(this.id);
      //  this.product=this._service.getProductById(this.id);

    })

    // this._service.getProductById(this.id).subscribe(response=>{this.product=response});
    this._service.getProductByProductId(this.id).subscribe(response => {
      this.product = response
      console.log(this.product);
      console.log(this.product.category);
      this.mainCat = this.product.category.mainCategory.categoryName;
      this.subCat = this.product.category.subCategory.categoryName;
      this.secondCat = this.product.category.secondaryCategory.categoryName;
      console.log(this.mainCat);
      console.log(this.subCat);
      console.log(this.secondCat);


    });

    this._service.allCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);

    });
    this.loadMainCategories();
    // this.selectedSize
    console.log(this.selectedSize);

  }


  selectedSizee: string = ''; // The selected size

  toggleSize1(size: string): void {
    this.selectedSizee = size === this.selectedSizee ? '' : size;
    console.log(this.selectedSizee);
  }

  isSelectedSize(size: string): boolean {
    return this.product.sizes.includes(size);
  }
  
  toggleSize(size: string): void {
    
    if (this.selectedSize.includes(size)) {
      this.selectedSize = this.selectedSize.filter(s => s !== size);
    } else {
      //  this.selectedSize=this.product.sizes
      this.selectedSize.push(size);
    }
    // this.selectedSize=this.product.sizes
    console.log(this.selectedSize);
  }

  loadMainCategories(): void {
    this._service.allCategories().subscribe(data => {
      this.mainCategories = data;
      console.log(this.mainCategories);
      console.log(this.subCategories);
    });
  }

  onMainCategoryChange(): void {
    // this.mainC=this.selectedMainCategory;
    // console.log('Main Category:', this.mainC);
    // this.selectedMainCategory = this.selectedMainCategory.categoryId;
    console.log('Selected Main Category:', this.selectedMainCategory);
    // this.subCategories = this.loadSubCategories(this.selectedMainCategory);
    if (this.selectedMainCategory) {
      this.loadSubCategories(this.selectedMainCategory);
    }
  }

  loadSubCategories(mainCategoryId: number): void {
    this._service.getSubCategories(mainCategoryId).subscribe(data => {
      this.apiResponse = data;
      this.subCategories = this.apiResponse.data;
      console.log("loadSubCategories : ", this.subCategories);

    });
  }

  onSubCategoryChange(): void {
    if (this.selectedSubCategory) {
      this.loadSecondaryCategories(this.selectedSubCategory);
    }
  }

  loadSecondaryCategories(subCategoryId: number): void {
    this._service.getSecondaryCategories(subCategoryId).subscribe(data => {
      this.apiResponse = data;
      this.secondaryCategories = this.apiResponse.data;
      console.log("loadSecondaryCategories : ", this.secondaryCategories);

    });
  }


  getImageUrl(base64String: string) {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    } else {
      return ''; // Provide a default image URL or handle missing images
    }
  }




  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Create a FileReader to read the selected image
      const reader = new FileReader();

      // Set the event handler when the FileReader has finished loading the image
      reader.onload = (e) => {
        this.imageUrl = e.target?.result || null; // Store the base64 URL of the image or null if not found
      };

      // Read the selected image as a data URL (base64)
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.imageUrl = null; // Clear the image preview if no image is selected
    }
  }

  editProductForm: FormGroup = this._fb.group({
    productId: [''],
    productName: ['', Validators.required],
    description: ['', Validators.required],
    mainCategory: [''],
    subCategory: [''],
    secondaryCategory: [''],
    sizes: [],
    price: ['', Validators.required],
    image: ['']
  });






  editProduct() {




    const productData = this.editProductForm.value;
    productData.sizes = this.selectedSize;
    console.log(this.selectedSize);
    console.log(productData);
    

    const formData = new FormData();
    formData.append('productName', productData.productName);
    formData.append('description', productData.description);
    formData.append('mainCategory', productData.mainCategory);
    formData.append('subCategory', productData.subCategory);
    formData.append('secondaryCategory', productData.secondaryCategory);
    formData.append('sizes', productData.sizes);
    formData.append('price', productData.price);
    formData.append('image', this.selectedFile as File);
    /* if (this.selectedFile !== null && this.selectedFile !== undefined) {
 
       formData.append('image', this.selectedFile as File);
     } else {
        const previousImage = this.editProductForm.controls['image'].value;
      // const previousImage = imageFile;
       formData.append('image', previousImage as File);
     }*/

    this._service.updateProductMongo(this.id, formData)
      .subscribe(response => {
        this.apiResponse = response;

        var json = JSON.parse(this.apiResponse);
        console.log(json);
        alert(json.message)
      },
        error => {
          console.log(error);
          console.log(error.error.message);

          alert(error.error.message);
        }
      );
    // setTimeout(() => {

    //   this._router.navigate(['/admin-dashboard']);
    // }, 1000);
  }
}
