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

  //  get(id?: number): Observable<Book | Book[]> {
  //   return this.http.get(id ? [url, id].join('/') : url).pipe(
  //     map(this.extractData),
  //     catchError(error => this.handleError(error))
  //   );
  //  }

  //  create(book: Book): Observable<Book> {
  //    return this.http.post(url, book).pipe(
  //     map(this.extractData),
  //     catchError(error => this.handleError(error))
  //    );
  //  }

  //  update(id: number, book: Book): Observable<Book> {
  //   return this.http.put([url, id].join('/'), book).pipe(
  //    map(this.extractData),
  //    catchError(error => this.handleError(error))
  //   );
  // }


  //  delete(id: number): Observable<Response> {
  //     return this.http.delete([url, id].join('/')).pipe(
  //       map(this.extractData),
  //       catchError(error => this.handleError(error))
  //     )
  //  }
 }
