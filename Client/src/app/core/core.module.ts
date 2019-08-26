import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HttpTokenInterceptor } from './interceptors';

import {
  JwtService,
  UserService,
  ApiService,
  EntryService,
  AuthGuardService,
} from './services';

import {
  HttpQueryBuilder
} from "./utils";

@NgModule({
  declarations: [],
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
    HttpQueryBuilder,
    AuthGuardService
  ]
})
export class CoreModule { }
