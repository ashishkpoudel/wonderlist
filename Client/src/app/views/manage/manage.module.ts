import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageComponent } from './manage.component';
import { MaterialModule } from 'src/app/material.module';
import { EntryComponent } from './entry/entry.component';
import { EntryIndexComponent } from './entry-index/entry-index.component';
import { SettingComponent } from './setting/setting.component';
import { PasswordConfirmDialogComponent } from './setting/password-confirm-dialog/password-confirm-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children:
    [
      {
        path: 'entries',
        children: [
          {
            path: '',
            component: EntryIndexComponent,
          },
          {
            path: ':id',
            component: EntryComponent,
          }
        ]
      },

      {
        path: 'settings',
        component: SettingComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [
    ManageComponent,
    EntryComponent,
    EntryIndexComponent,
    SettingComponent,
    PasswordConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    EntryComponent,
    PasswordConfirmDialogComponent
  ]
})
export class ManageModule { }
