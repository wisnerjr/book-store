import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { SubSink } from 'subsink';
import { StockService } from 'src/app/shared/services/stock.service';
import { Book } from 'src/app/shared/models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

const addProductRoute = 'admin/add-product/';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  subs = new SubSink();
  displayedColumns: string[] = ['id', 'name', 'author', 'genre', 'language', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Book>([]);

  constructor(
    private stockService: StockService,
    protected uiStateService: UiStateService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  loadBooks() {
    this.subs.sink = this.stockService.get().subscribe((resp: Array<Book>) => {
      this.dataSource.data = resp.sort((a, b) => { return a.id - b.id; });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAddToCart(element: Book, quantityOrdered) {

    let message = `Are you sure to add ${element.id}#${element.name} to cart?`
    let fn = () => {
      if (element.quantity >= quantityOrdered) {
        element.quantityOrder = quantityOrdered;
        this.uiStateService.addItemToShoppingCart(<Book>element);
        quantityOrdered = undefined;
      } else {
        this.snackBar.open('Quantity ordered is greater than quantity avaiable at stock!', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['alert-snackbar', 'justify-content-center']
        });
        return;
      }
     }
    this.confirmDialog('Add To Shopping Cart', message, fn);
  }

  onEdit(element) {
    let message = `Are you sure to edit ${element.id}#${element.name} book(s)?`
    let fn = () => {
      this.router.navigate([addProductRoute, element.id]);
     }
    this.confirmDialog('Remove Book', message, fn);
  }

  onRemove(element) {
    let message = `Are you sure to remove ${element.id}#${element.name} book(s)?`
    let fn = () => {
      this.stockService.delete(element.id).subscribe(() => this.loadBooks());
     }
    this.confirmDialog('Remove Book', message, fn);
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
