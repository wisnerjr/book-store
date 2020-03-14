import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularMaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
