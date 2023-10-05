import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DemoComponent } from './components/demo/demo.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginTemplateDrivenComponent } from './components/login-template-driven/login-template-driven.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlaceOrderCartComponent } from './components/place-order-cart/place-order-cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BuyProductResolverService } from './utility/buy-product-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductComponent },
  { path: "addProduct", component: AddProductComponent },
  { path: "getProduct/:id", component: ProductDetailsComponent },
  { path: "getAddress/:id", component: EditAddressComponent },
  { path: "placeOrder", component: PlaceOrderComponent },
  {
    path: "placeOrderCart", component: PlaceOrderCartComponent,
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
  { path: "edit/:id", component: EditProductComponent },
  { path: "login", component: LoginTemplateDrivenComponent },
  { path: "register", component: RegisterComponent },
  { path: "demo", component: DemoComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "user-dashboard", component: UserDashboardComponent },
  { path: "myCart", component: MyCartComponent },
  {
    path: "add-inventory", component: AddInventoryComponent
    // ,resolve: {
    //   productDetails: BuyProductResolverService,
    // },
  },

  { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
