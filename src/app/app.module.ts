import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuModule } from './pages/menu/menu.module';
import { AddProductComponent } from './pages/admin/add-product/add-product/add-product.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';
import { ListOrderComponent } from './pages/admin/list-order/list-order.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/modules/shared.module';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { TextOnlyDirective } from './shared/directives/text-only.directive';
import { AlertSnackbarComponent } from './shared/components/alert-snackbar/alert-snackbar.component';
import { EnumValuePipe } from './shared/pipes/enum-value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ListProductComponent,
    CheckoutComponent,
    ListOrderComponent,
    ConfirmDialogComponent,
    NumberOnlyDirective,
    TextOnlyDirective,
    AlertSnackbarComponent,
    EnumValuePipe
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
