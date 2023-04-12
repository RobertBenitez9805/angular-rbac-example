import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ignoreElements, map, Observable, tap } from 'rxjs';
import { LoginCredentials } from './model';
import { User } from './model/user.interface';

const USER_LOCAL_STORAGE_KEY = 'userData';

// const SERVICE_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(credentials: LoginCredentials): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/api/auth/signin", credentials)
    .pipe(
      tap((user) => this.pushNewUser(user)),
      tap((user) => this.saveTokenToLocalStore(user)),
      ignoreElements()
    );
  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private pushNewUser(user: User) {
    this.user.next(user);
  }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if(userFromLocal != null){
      const user = JSON.parse(userFromLocal) as User;
      user && this.pushNewUser(user);
    }
  }

  private saveTokenToLocalStore(user: User): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }
}