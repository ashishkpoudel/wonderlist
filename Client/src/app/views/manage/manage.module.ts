import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageComponent } from './manage.component';
import { MaterialModule } from 'src/app/material.module';
import { EntryComponent } from './entry/entry.component';
import { EntryIndexComponent } from './entry-index/entry-index.component';
import { EntryResolver } from './entry/entry-resolver.service';

const routes: Routes = [
  {
    path: 'entries',
    component: ManageComponent,
    children:
    [
      {
        path: '',
        component: EntryIndexComponent,
      },
      {
        path: ':id',
        component: EntryComponent,
        resolve: { entry: EntryResolver },
      }
    ]
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    EntryComponent,
    EntryIndexComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    EntryResolver,
  ]
})
export class ManageModule { }
