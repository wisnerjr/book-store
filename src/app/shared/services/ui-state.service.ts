import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  private _clientName = 'Wisner Júnior';
  private _checkoutCount = new BehaviorSubject<number>(0);
  private _isAdmin = false;

  constructor() { }

  get clientName() { return this._clientName; }
  set clientName(value) { this._clientName = value; }

  get checkoutCount() {
    let count;
    this._checkoutCount.subscribe(value => {
      count = value;
    });
    return count;
  }
  set checkoutCount(value: number) { this._checkoutCount.next(value); }

  unsubscribeSubject() {
    this._checkoutCount.unsubscribe();
  }

  addItemToCheckout() { this.checkoutCount++;  }

  resetCheckout() {  this.checkoutCount = 0; }

  get isAdmin() { return this._isAdmin; }
  set isAdmin(value) { this._isAdmin = value; }
}
