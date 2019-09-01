import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';

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

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/me').subscribe(
        data => { this.setAuth(new User(data.data)); },
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

  update(id: number|string, data: object = {}): Observable<User> {
    return this.apiService.patch(`/users/${id}`, data).pipe(
      map(response => {
        return new User(response.data);
      })
    );
  }

  updateProfile(id: number|string, data: object = {}): Observable<any> {
    return this.apiService.patch(`/users/${id}/update-profile`, data).pipe(
      tap(data => this.populate())
    )
  }

  updatePassword(id: number|string, data: object = {}): Observable<any> {
    return this.apiService.patch(`/users/${id}/update-password`, data).pipe(
      tap(data => this.populate())
    );
  }

  logout() {
    this.purgeAuth();
  }
}
