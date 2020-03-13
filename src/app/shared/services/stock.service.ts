import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = [environment.apiUrl, 'stock'].join('/');

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService<Book> {

  constructor(protected http: HttpClient) {
    super(http, url);
   }
 }
