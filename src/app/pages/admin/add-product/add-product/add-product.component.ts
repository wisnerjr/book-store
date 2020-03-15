import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';
import { UiStateService } from 'src/app/shared/services/ui-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/shared/models/book.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language } from 'src/app/shared/enums/language.enum';
import { Genre } from 'src/app/shared/enums/genre.enum';

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
  Language = Language;
  genreList = Object.keys(Genre).map(genre => { return {value: genre, label: genre}});
  selectedGenres = [];

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    protected uiStateService: UiStateService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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
          genre: this.book.genre.split(', '),
          language: this.book.language
        });
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
      language: undefined,
      genre: [],
      quantity: [undefined, [Validators.required]]
    });
  }

  ngOnDestroy() { this.subs.unsubscribe(); }

  submit() {
    if (!this.isEditing && this.existingBooksIds.has(this.formGroup.value.id)) {
      this.formGroup.controls['id'].setErrors({'inconrrect': true});
      this.snackBar.open('Id was already assign to a book. Id must be unique!', '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['alert-snackbar', 'justify-content-center']
      });

      setTimeout(() => {
        this.formGroup.controls['id'].setErrors(null);
      }, 3000);
      return;
    }

    Object.assign(this.book, this.formGroup.value);
    this.book.genre = this.formGroup.value.genre.join(', ');
    if(this.isEditing) {
      this.stockService.update(this.book.id, this.book).subscribe(() => { this.redirectToHome() });
    } else {
      this.stockService.create(this.book).subscribe(() => { this.redirectToHome() });
    }
  }

  onCancel() {
    this.uiStateService.isAdmin = true;
    this.navigateToListProduct();
  }

  navigateToListProduct() {
    this.router.navigateByUrl(listProductRoute);
  }

  redirectToHome() {
    this.router.navigateByUrl('/');
  }
}
