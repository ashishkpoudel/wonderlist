import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private jwtService: JwtService,
    private apiService: ApiService
  ) {}

  private setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    this.jwtService.removeToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/me').subscribe(
        data => { this.setAuth(User.fromJson(data.data)); },
        err => { this.purgeAuth(); }
      );
    } else {
      this.purgeAuth();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.post('/login', {'email': email, 'password': password})
      .pipe(map(
        data => {
          this.jwtService.saveToken(data.api_token);
          this.populate();
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    this.purgeAuth();
  }
}
