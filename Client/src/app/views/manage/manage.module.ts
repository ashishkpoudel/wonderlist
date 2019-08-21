import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageComponent } from './manage.component';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  { path: '', component: ManageComponent }
];

@NgModule({
  declarations: [
    ManageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ManageModule { }
