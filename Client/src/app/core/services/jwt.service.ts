import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  getToken(): string {
    return window.localStorage[`JwtToken`];
  }

  saveToken(token: string) {
    window.localStorage[`JwtToken`] = token;
  }

  removeToken() {
    window.localStorage.removeItem(`JwtToken`);
  }
}
