import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MenuComponent } from './menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { UiStateService } from 'src/app/shared/services/ui-state.service';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent
  ],
  providers: [],
})

export class MenuModule { }
