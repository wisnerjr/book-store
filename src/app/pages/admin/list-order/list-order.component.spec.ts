import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOrderComponent } from './list-order.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('ListOrderComponent', () => {
  let component: ListOrderComponent;
  let fixture: ComponentFixture<ListOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrderComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
