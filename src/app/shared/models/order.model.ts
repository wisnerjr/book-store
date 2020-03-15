import { format as format } from 'date-fns';
import { UiStateService } from '../services/ui-state.service';
import { OrderStatus } from '../enums/order-status.enum';

export class Order {
  constructor(orderDescription, uiStateService: UiStateService) {
    this.orderDescription = orderDescription;
    this.orderUser = uiStateService.clientName;
    this.orderDate = format(new Date(), 'MM/dd/yyyy hh:mm:ss');
    this.orderStatus = OrderStatus.PENDING;
  }

  orderDescription: string;
  orderUser: string;
  orderDate: string;
  orderStatus: string;
}
