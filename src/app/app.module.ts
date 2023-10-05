import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/product/product.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertSpaceToPipe } from './utility/convert-space-to.pipe';
import { SearchPipe } from './utility/search.pipe';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginTemplateDrivenComponent } from './components/login-template-driven/login-template-driven.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DemoComponent } from './components/demo/demo.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SortByPricePipe } from './utility/sort-by-price.pipe';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { AuthInterceptorProvider } from './utility/auth-interceptor.interceptor';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { PlaceOrderCartComponent } from './components/place-order-cart/place-order-cart.component';
import { ApiErrorInterceptor } from './utility/api-error-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    ConvertSpaceToPipe,
    SearchPipe,
    NavComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductDetailsComponent,
    LoginTemplateDrivenComponent,
    RegisterComponent,
    AddProductComponent,
    DemoComponent,
    EditProductComponent,
    SortByPricePipe,
    ParentComponent,
    ChildComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    EditAddressComponent,
    PlaceOrderComponent,
    MyCartComponent,
    PlaceOrderCartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [AuthInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
