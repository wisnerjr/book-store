import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { SubSink } from 'subsink';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { StockService } from 'src/app/shared/services/stock.service';
import { Book } from 'src/app/shared/models/book.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/shared/models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  subs = new SubSink();
  displayedColumns: string[] = ['icon', 'name', 'quantity'];
  dataSource = new MatTableDataSource<Book>([]);
  shoppingCartList = new Array<Book>();

  constructor(
    private uiStateService: UiStateService,
    private checkoutService: CheckoutService,
    private stockService: StockService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() { this.loadShoppingCart(); }

  ngOnDestroy() { this.subs.unsubscribe; }

  loadShoppingCart() {
    this.shoppingCartList = this.uiStateService.shoppingCart;
    this.dataSource.data = this.uiStateService.shoppingCart;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPurchase() {

    let message = `Confirm this purchase?`;

    let fn = () => {
      let descriptionList = [];
      this.shoppingCartList.forEach(book => {
        descriptionList.push(`${book.name} (${book.quantityOrder} un.)`)
      });

      let order = new Order(descriptionList.join("; "), this.uiStateService);

      this.checkoutService.create(order).subscribe(() => {
        this.shoppingCartList.forEach(book => {
          book.quantity -= book.quantityOrder;
          this.stockService.update(book.id, book).subscribe();
        });

        this.uiStateService.resetShoppingCart();
        this.loadShoppingCart();
      });
    }

    this.confirmDialog('Checkout', message, fn);
  }

  confirmDialog(title, message, callback?): void {

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) callback();
    });
  }


}
