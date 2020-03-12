import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuModule } from './pages/menu/menu.module';
import { AddProductComponent } from './pages/admin/add-product/add-product/add-product.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { CheckoutComponent } from './pages/user/checkout/checkout/checkout.component';
import { ListOrderComponent } from './pages/admin/list-order/list-order/list-order.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ListProductComponent,
    CheckoutComponent,
    ListOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MenuModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
