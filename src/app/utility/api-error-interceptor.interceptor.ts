import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          const customError = {
            httpStatus: error.error.httpStatus,
            timeStamp: error.error.timeStamp,
            httpStatusCode: error.error.httpStatusCode,
            status: error.error.status,
            message: error.error.message
          };
          return throwError(customError);
        }
        return throwError(error);
      })
    );
  }
}
