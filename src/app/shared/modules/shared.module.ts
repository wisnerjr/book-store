import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  imports: [
    FontAwesomeModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule
  ],
  exports: [
    FontAwesomeModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
