import { Component, OnInit, OnDestroy } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UiStateService } from 'src/app/shared/services/ui-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  isAdmin = true;

  constructor(private uiStateService: UiStateService) {}

  ngOnInit() { }

  ngOnDestroy() { this.uiStateService.unsubscribeSubject(); }


  addCount() {
    this.uiStateService.addItemToCheckout();
  }

  setAccess(value) {
    this.uiStateService.isAdmin = value;
  }
}
