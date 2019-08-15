import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';


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
  ]
})
export class ManageModule { }
