import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { HttpTokenInterceptor } from 'src/app/core';

import {
  JwtService,
  ApiService,
  AuthGuardService,
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    JwtService,
    ApiService,
    AuthGuardService
  ]
})
export class CoreModule { }
