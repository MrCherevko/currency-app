import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class HistoryService {

  constructor(private httpService: HttpService) { }

  getHistory(): any {
    return this.httpService.getHistory()
    .pipe(
      map((convertions) => {
        return Object.entries(convertions).map(([id, value]) => ({
            id,
            date: new Date(value.date),
            from: `${value.fromAmount} (${value.fromCode})`,
            to: `${value.toAmount} (${value.toCode})`,
        }))
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
