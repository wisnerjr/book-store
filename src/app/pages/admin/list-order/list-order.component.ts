import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SubSink } from 'subsink';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  subs = new SubSink();
  displayedColumns: string[] = ['id', 'orderDescription', 'orderDate', 'orderUser', 'orderStatus'];
  dataSource = new MatTableDataSource<Order>([]);

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.subs.sink = this.checkoutService.get().subscribe((resp: Array<Order>) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
