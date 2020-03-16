import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/shared/models/book.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let formGroup: FormGroup;

  const formBuilder = new FormBuilder();

  const textPattern = '^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\\.\\[\\]\\(\\)\\;\\{\\}\\!\\@\\#\\$\\%\\&\\?\\, ]+$';
  const textNamePattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ\\.\\;\\, ]+$';

  const book = new Book();
  book.id = 1;
  book.name = 'Test Name Book 1';
  book.author = 'Test Author';
  book.quantity = 999;
  book.language = 'English';
  book.genre = 'Fantasy, Syfy';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
       ],
       providers: [{provide: FormBuilder, useValue: formBuilder}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    formGroup = component.formGroup;

    formGroup = formBuilder.group({
          id: [undefined, [Validators.required]],
          name: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(textPattern)]],
          author: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(textNamePattern)]],
          language: undefined,
          genre: [],
          quantity: [undefined, [Validators.required, Validators.min(1), Validators.max(9999)]]
    });

    fixture.detectChanges();
  });

  function updateForm(book: Book) {
          formGroup.controls['id'].setValue(book.id);
          formGroup.controls['name'].setValue(book.name);
          formGroup.controls['author'].setValue(book.author);
          formGroup.controls['quantity'].setValue(book.quantity);
          formGroup.controls['genre'].setValue(book.genre.split(', '));
          formGroup.controls['language'].setValue(book.language);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid', () => {
      expect(formGroup.invalid).toBeTruthy();
  });

  it('form is valid', () => {
      updateForm(book);

      expect(formGroup.valid).toBeTruthy();
  });

  it('id has no value then form is invalid', () => {
    updateForm(book);

    let idControl = formGroup.controls['id'];
    idControl.setValue(null);

    expect(idControl.errors['required']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book name has no value then form is invalid', () => {
    updateForm(book);

    let nameControl = formGroup.controls['name'];
    nameControl.setValue(null);

    expect(nameControl.errors['required']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book name is lesser than 3 characters then form is invalid', () => {
    updateForm(book);

    let nameControl = formGroup.controls['name'];
    nameControl.setValue('A');

    expect(nameControl.errors['minlength']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book name is greater than 50 characters then form is invalid', () => {
    updateForm(book);

    let nameControl = formGroup.controls['name'];
    nameControl.setValue('A'.repeat(70));

    expect(nameControl.errors['maxlength']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book name has invalid characters then form is invalid', () => {
    updateForm(book);

    let nameControl = formGroup.controls['name'];
    nameControl.setValue('¬¢££¢¬¢£¬£¢¬£');

    expect(nameControl.errors['pattern']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book author has no value then form is invalid', () => {
    updateForm(book);

    let authorControl = formGroup.controls['author'];
    authorControl.setValue(null);

    expect(authorControl.errors['required']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book author is lesser than 3 characters then form is invalid', () => {
    updateForm(book);

    let authorControl = formGroup.controls['author'];
    authorControl.setValue('A');

    expect(authorControl.errors['minlength']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book author is greater than 50 characters then form is invalid', () => {
    updateForm(book);

    let authorControl = formGroup.controls['author'];
    authorControl.setValue('A'.repeat(70));

    expect(authorControl.errors['maxlength']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('book author has invalid characters then form is invalid', () => {
    updateForm(book);

    let authorControl = formGroup.controls['author'];
    authorControl.setValue('Th!$ !$ !NVAL!D');

    expect(authorControl.errors['pattern']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('quantity has no value then form is invalid', () => {
    updateForm(book);

    let quantityControl = formGroup.controls['quantity'];
    quantityControl.setValue(null);

    expect(quantityControl.errors['required']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('quantity is lesser than 1 then form is invalid', () => {
    updateForm(book);

    let quantityControl = formGroup.controls['quantity'];
    quantityControl.setValue(-1);

    expect(quantityControl.errors['min']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });

  it('quantity is greater than 9999 then form is invalid', () => {
    updateForm(book);

    let quantityControl = formGroup.controls['quantity'];
    quantityControl.setValue(99999999);

    expect(quantityControl.errors['max']).toBeTruthy();
    expect(formGroup.invalid).toBeTruthy();
  });
});
