import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { Book } from 'src/app/shared/models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit, OnDestroy {
  isAdmin = true;

  constructor(protected uiStateService: UiStateService, private route: Router) {}

  ngOnInit() { }

  ngOnDestroy() { this.uiStateService.unsubscribeSubject(); }


  navigateToCheckout() { this.route.navigateByUrl('user/checkout'); }

  setAccess(value) {
    this.uiStateService.isAdmin = value;
  }
}
