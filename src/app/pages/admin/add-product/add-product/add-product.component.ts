import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  subs = new SubSink();

  isEditing: boolean;
  bookId: number;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    protected uiStateService: UiStateService,
    private router: Router
    // public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.bookId = <number>this.route.snapshot.paramMap['id'];
      this.isEditing = true;
    }
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

}
