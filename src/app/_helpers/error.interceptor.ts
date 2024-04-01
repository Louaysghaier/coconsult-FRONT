import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && (err.status === 401 || err.status === 403)) {
                // Check if the error response indicates an expired token
                if (err.error && err.error.message === 'Token expired') {
                    // Call refreshToken method
                    return this.accountService.refreshToken().pipe(
                        switchMap(() => {
                            // Retry the original request with the new token
                            return next.handle(request);
                        }),
                        catchError(() => {
                            // Logout if refreshToken fails
                            this.accountService.logout();
                            return throwError(() => 'Token refresh failed');
                        })
                    );
                } else {
                    // Logout user for other 401 or 403 errors
                    this.accountService.logout();
                }
            }

            // Pass the error through if it's not a 401 or 403 error
            return throwError(() => err);
        }));
    }
}
