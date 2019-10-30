import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoreModule } from "src/app/core";

import { ManageComponent } from './manage.component';
import { MaterialModule } from 'src/app/material.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { SettingComponent } from './setting/setting.component';
import { EditPasswordDialogComponent } from './setting/edit-password-dialog/edit-password-dialog.component';
import { EditProfileDialogComponent } from './setting/edit-profile-dialog/edit-profile-dialog.component';
import { EntryEditComponent } from './entry-edit/entry-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';

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
            component: EntryListComponent,
          },
          {
            path: 'trash',
            component: EntryListComponent
          }
        ]
      },

      {
        path: 'tags',
        component: TagListComponent,
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
    EntryListComponent,
    SettingComponent,
    EditPasswordDialogComponent,
    EditProfileDialogComponent,
    EntryEditComponent,
    TagListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,

    CoreModule,
    MaterialModule,
  ],
  entryComponents: [
    EditPasswordDialogComponent,
    EditProfileDialogComponent,
  ]
})
export class ManageModule { }
