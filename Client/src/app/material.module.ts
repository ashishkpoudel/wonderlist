import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatSidenavModule,
} from '@angular/material';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatMenuModule,
  MatCheckboxModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
