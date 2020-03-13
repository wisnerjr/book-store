import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  constructor(protected http: HttpClient, protected url: string) { }

  get(id?: number): Observable<T | Array<T>> {
    return this.http.get(id ? [this.url, id].join('/') : this.url).pipe(
      map(this.extractData),
      catchError(error => this.handleError(error))
    );
   }

   create(T: T): Observable<T> {
     return this.http.post(this.url, T).pipe(
      map(this.extractData),
      catchError(error => this.handleError(error))
     );
   }

   update(id: number, T: T): Observable<T> {
    return this.http.put([this.url, id].join('/'), T).pipe(
     map(this.extractData),
     catchError(error => this.handleError(error))
    );
  }


   delete(id: number): Observable<any> {
      return this.http.delete([this.url, id].join('/')).pipe(
        catchError(error => this.handleError(error))
      );
   }

  extractData(res: Response | any) {
    try { return res; }
    catch(e) { return {}; }
  }

  handleError(error: Response | any) {
    return throwError(error);
  }
}
