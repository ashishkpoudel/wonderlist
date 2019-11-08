import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagMenuComponent } from './tag-dropdown/tag-menu.component';

import { MaterialModule } from "../material.module";
import { CoreModule } from "src/app/core";

@NgModule({
  declarations: [TagMenuComponent],
  exports: [
    TagMenuComponent
  ],
  imports: [
    CommonModule,

    CoreModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
