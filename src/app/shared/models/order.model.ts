import { format as format } from 'date-fns';
import { UiStateService } from '../services/ui-state.service';

export class Order {
  constructor(bookName, quantity, uiStateService: UiStateService) {
    this.bookName = bookName;
    this.quantity = quantity;
    this.orderUser = uiStateService.clientName;
    this.orderDate = format(new Date(), 'mm/dd/yyyy hh:ss');
  }

  bookName: string;
  orderUser: string;
  orderDate: string;
  quantity: number;
}
