import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private _clientName = 'Wisner Júnior';
  private _shoppingCart = new BehaviorSubject<Book[]>([])
  private _items = new Array<Book> ();
  private _isAdmin = false;

  constructor() { }

  get clientName() { return this._clientName; }
  set clientName(value) { this._clientName = value; }

  get shoppingCart() {
    this._shoppingCart.asObservable().subscribe(books => this._items = books );
    return this._items;
  }

  addItemToShoppingCart(book: Book) {
    this._items.push(book);
    this._shoppingCart.next(this._items);
  }

  resetShoppingCart() {
    this._items = [];
    this._shoppingCart.next([]);
  }

  countItems() { return this._items.length; }

  unsubscribeSubject() { this._shoppingCart.unsubscribe(); }

  get isAdmin() { return this._isAdmin; }
  set isAdmin(value) { this._isAdmin = value; }
}
