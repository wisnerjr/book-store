import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';


const url = [environment.apiUrl, 'checkout'].join('/');

@Injectable({
  providedIn: 'root'
})
export class CheckoutService extends BaseService<Order> {

  constructor(protected http: HttpClient) {
    super(http, url);
   }
}
