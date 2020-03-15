import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    SharedModule
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
