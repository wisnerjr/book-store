import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
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
