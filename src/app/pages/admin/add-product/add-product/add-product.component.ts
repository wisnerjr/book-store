import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/shared/models/book.model';

const listProductRoute = '/list-product';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit,  OnDestroy {
  subs = new SubSink();
  isEditing: boolean;
  bookId: number;
  book = new Book();
  formGroup: FormGroup;
  submitted = false;

  existingBooksIds: Set<number>;


  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    protected uiStateService: UiStateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.bookId = <number>this.route.snapshot.params['id'];
      this.isEditing = true;
      this.subs.sink = this.stockService.get(this.bookId).subscribe((resp: Book) => {
        this.book = resp;
        this.formGroup.patchValue({
          id: this.book.id,
          name: this.book.name,
          author: this.book.author,
          quantity: this.book.quantity,
          genre: this.book.genre,
          language: this.book.language
        })
        console.log(this.formGroup);
      });
      this.formGroup.controls['id'].disable();
    } else {
      this.subs.sink = this.stockService.get().subscribe((resp: Book[]) => {
        this.existingBooksIds = new Set([...resp.map(r => { return r.id; })]);
      });
    }
  }

  buildForm() {
    this.formGroup = this.fb.group({
      id: [undefined, [Validators.required]],
      name: [undefined, [Validators.required, Validators.min(3), Validators.max(50)]],
      author: [undefined, [Validators.required, Validators.min(3), Validators.max(50)]],
      genre: undefined,
      language: undefined,
      quantity: [undefined, [Validators.required]]
    });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  submit() {
    if (!this.isEditing && this.existingBooksIds.has(this.formGroup.value.id)) console.log("repeated!");
  }

  onCancel() {
    this.uiStateService.isAdmin = true;
    this.redirectToListProduct();
  }

  redirectToListProduct() {
    this.router.navigateByUrl(listProductRoute);
  }

}
