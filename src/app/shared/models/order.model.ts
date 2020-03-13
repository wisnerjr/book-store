import { format as format } from 'date-fns';
import { UiStateService } from '../services/ui-state.service';
import { OrderStatus } from '../enums/order-status.enum';

export class Order {
  constructor(bookName, quantity, uiStateService: UiStateService) {
    this.bookName = bookName;
    this.quantity = quantity;
    this.orderUser = uiStateService.clientName;
    this.orderDate = format(new Date(), 'mm/dd/yyyy hh:ss');
    this.orderStatus = OrderStatus.PENDING;
  }

  bookName: string;
  orderUser: string;
  orderDate: string;
  quantity: number;
  orderStatus: string;
}
