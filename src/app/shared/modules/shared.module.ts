import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    FontAwesomeModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule
  ],
  exports: [
    FontAwesomeModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
