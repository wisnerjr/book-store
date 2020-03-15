import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/admin/add-product/add-product/add-product.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ListOrderComponent } from './pages/admin/list-order/list-order/list-order.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin/list-order', component: ListOrderComponent},
  { path: 'user/checkout', component: CheckoutComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'admin/add-product', component: AddProductComponent },
  { path: 'admin/add-product/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
