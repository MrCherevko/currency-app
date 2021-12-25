import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import { ConverterResponse, Convertion } from '../types/convertion';
import { ApiCurrency } from '../types/currency';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  errorHandler() {
    return <T>(source: Observable<T>): Observable<T> => {
      return source.pipe(
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(
            `HTTP Error Code ${error.status} try again later.`,
            'OK'
          );
          return throwError(() => new Error(error.message));
        })
      );
    };
  }

  getCurrencies(): Observable<ApiCurrency> {
    return this.http
      .get<ApiCurrency>('https://api.frankfurter.app/currencies')
      .pipe(this.errorHandler());
  }

  convertCurrency(
    amount: string,
    from: string,
    to: string
  ): Observable<ConverterResponse> {
    return this.http
      .get<ConverterResponse>('https://api.frankfurter.app/latest', {
        params: { amount, from, to },
        responseType: 'json',
      })
      .pipe(this.errorHandler());
  }

  setNewConvertion(convertion: Convertion): Observable<string> {
    return this.http
      .post<string>(
        'https://react-app-afb70-default-rtdb.firebaseio.com/convertion.json',
        convertion
      )
      .pipe(this.errorHandler());
  }

  getHistory(): Observable<{ [id: string]: Convertion }> {
    return this.http
      .get<{ [id: string]: Convertion }>(
        'https://react-app-afb70-default-rtdb.firebaseio.com/convertion.json'
      )
      .pipe(this.errorHandler());
  }
}
