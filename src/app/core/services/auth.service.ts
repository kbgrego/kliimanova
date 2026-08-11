import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface AuthUser {
  email: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly currentUser$ = this.http
    .get<AuthUser>('/api/auth/me', {
      withCredentials: true
    })
    .pipe(
      catchError(() => of(null)),
      shareReplay(1)
    );

  getCurrentUser(): Observable<AuthUser | null> {
    return this.currentUser$;
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => user !== null)
    );
  }

  loginWithGoogle(): void {
    window.location.href = '/api/auth/google';
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(
        '/api/auth/logout',
        {},
        {
          withCredentials: true
        }
      )
      .pipe(
        catchError(() => of(undefined)),
        map(() => undefined)
      );
  }
}
