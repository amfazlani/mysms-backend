import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // adjust path if needed

export interface User {
  id: number;
  email: string;
  // add other user properties here if needed
}

const API_BASE_URL = environment.API_BASE_URL;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Instead of a single token, you use these token headers from devise_token_auth
  get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'access-token': localStorage.getItem('access-token') || '',
      uid: localStorage.getItem('uid') || '',
      client: localStorage.getItem('client') || ''
    });
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/auth/sign_in`, data, { observe: 'response' })
      .pipe(
        tap(res => {
          this.setTokens(res.headers);
          // Adjust based on your API's user object structure
          this.userSubject.next(res.body.data);
        })
      );
  }

  register(data: { email: string; password: string; password_confirmation: string }): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/auth`, data, { observe: 'response' })
      .pipe(
        tap(res => {
          this.setTokens(res.headers);
          this.userSubject.next(res.body.data);
        })
      );
  }

  signOut(): Observable<any> {
    return this.http.delete(`${API_BASE_URL}/auth/sign_out`, { headers: this.authHeaders })
      .pipe(
        tap(() => this.clearTokens())
      );
  }

  restoreUser(): Observable<User | null> {
    const headers = this.authHeaders;
    if (!headers.get('access-token')) {
      this.userSubject.next(null);
      return of(null);
    }

     return this.http.get<{ data: User }>(`${API_BASE_URL}/auth/validate_token`, { headers }).pipe(
      tap((res: { data: User }) => this.userSubject.next(res.data)),
      map((res: { data: User }) => res.data),
      catchError(() => {
        this.clearTokens();
        this.userSubject.next(null);
        return of(null);
      })
    );
  }


  private setTokens(headers: HttpHeaders): void {
    // Store token headers in localStorage for later use
    localStorage.setItem('access-token', headers.get('access-token') || '');
    localStorage.setItem('uid', headers.get('uid') || '');
    localStorage.setItem('client', headers.get('client') || '');
  }

  private clearTokens(): void {
    localStorage.removeItem('access-token');
    localStorage.removeItem('uid');
    localStorage.removeItem('client');
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('access-token');
  }
}
  
