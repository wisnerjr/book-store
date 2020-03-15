import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedModule } from '../modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../models/book.model';
import { StockService } from './stock.service';
import { BaseService } from './base.service';


describe('StockService', () => {
  let service: StockService;

  let data1 = new Book();
  data1.id = 1;
  data1.name = 'Book 1';

  let data2 = new Book();
  data1.id = 2
  data2.name = 'Book 2';

  let dataList = new Array<Book>(data1, data2);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule
      ],
      providers: [{ provide: BaseService, useClass: Book }]
    });
    service = TestBed.get(StockService);
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get list of data', () => {
    spyOn(service, 'get').and.returnValue(of(dataList));
    let result;
    service.get().subscribe(resp => result = resp);

    expect(service.get).toHaveBeenCalled();

    expect(dataList.length).toEqual(result.length);
    expect(result).toContain(data1);
    expect(result).toContain(data2);

  });

  it('get book from id', () =>  {
    spyOn(service, 'get').and.returnValue(of(data1));
    let result;
    service.get(data1.id).subscribe(resp => result = resp);

    expect(service.get).toHaveBeenCalled();

    expect(result.id).toBe(data1.id);
    expect(result.name).toBe(data1.name);
  });

  it('create/save a book', () => {
    let newBook = new Book();
    newBook.name = 'Book 3';

    spyOn(service, 'create').and.returnValue(of(newBook));

    service.create(newBook).subscribe();

    expect(service.create).toHaveBeenCalled();
  });

  it('update a book', () => {
    let updatedBook = {...data1};
    updatedBook.name = 'Book Updated';

    spyOn(service, 'update').and.returnValue(of(updatedBook));

    service.update(updatedBook.id, updatedBook).subscribe();

    expect(service.update).toHaveBeenCalled();
  });

  it('delete a book', () => {
    let bookToDelete = {...data1};

    spyOn(service, 'delete').and.returnValue(of());

    service.delete(bookToDelete.id).subscribe();

    expect(service.delete).toHaveBeenCalled();
  });
});
