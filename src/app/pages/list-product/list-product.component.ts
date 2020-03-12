import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { StockService } from 'src/app/shared/services/stock.service';
import { Book } from 'src/app/shared/models/book.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  subs = new SubSink();
  displayedColumns: string[] = ['id', 'name', 'author', 'genre', 'language', 'quantity'];
  dataSource = new MatTableDataSource<Book>([]);

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.subs.sink = this.stockService.get().subscribe((resp: Array<Book>) => {
      this.dataSource = new MatTableDataSource<Book>(resp);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }
}
