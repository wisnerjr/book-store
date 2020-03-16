import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnumValuePipe } from '../pipes/enum-value.pipe';
import { NumberOnlyDirective } from '../directives/number-only.directive';
import { AlertSnackbarComponent } from '../components/alert-snackbar/alert-snackbar.component';


@NgModule({
  declarations: [
    NumberOnlyDirective,
    AlertSnackbarComponent,
    EnumValuePipe
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    NumberOnlyDirective,
    AlertSnackbarComponent,
    EnumValuePipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
