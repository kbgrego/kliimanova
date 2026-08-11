import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { RequestEntry, ServiceRequestResponse } from '../core/request/request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  // Endpoint relative to the same host (Vercel routes automatically)
  private readonly apiUrl = '/api/public/request';

  // Reactive state for loading indicators
  readonly isLoading = signal<boolean>(false);

  /**
   * Submits a new service request to the Vercel backend.
   */
  submitRequest(payload: RequestEntry): Observable<ServiceRequestResponse> {
    this.isLoading.set(true);

    console.log('Submitting request payload:', payload);

    return this.http.post<ServiceRequestResponse>(this.apiUrl, payload).pipe(
      tap({
        subscribe: () => console.log('Subscribed'),
        next: res => console.log('Response', res),
        error: err => console.log('HTTP error', err)
      }),
      catchError(this.handleError),
      finalize(() => {
        console.log('Finalize');
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Handles HTTP/Validation errors cleanly
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred.';

    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
    } else if (error.error && error.error.details) {
      // Backend validation error (Zod)
      return throwError(() => error.error as ServiceRequestResponse);
    } else if (error.error && error.error.error) {
      // Custom server error message
      errorMessage = error.error.error;
    }

    return throwError(() => ({ success: false, error: errorMessage }));
  }
}
