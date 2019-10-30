import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HttpTokenInterceptor } from './interceptors';

import {
  JwtService,
  UserService,
  ApiService,
  EntryService,
  TagService,
  MediaService,
  AuthGuardService,
  GlobalService,
} from './services';

import {
  FocusDirective
} from "./directives";

import {
  HttpQueryBuilder
} from "./utils";

@NgModule({
  declarations: [FocusDirective],
  exports: [FocusDirective],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    UserService,
    ApiService,
    EntryService,
    TagService,
    MediaService,
    GlobalService,
    HttpQueryBuilder,
    AuthGuardService
  ]
})
export class CoreModule { }
