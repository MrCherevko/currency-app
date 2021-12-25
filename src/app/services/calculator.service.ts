import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';
import { ConverterResponse, Convertion, ConvertionResult } from '../types/convertion';
import {
  ApiCurrency,
  Currency,
  CurrencyForm,
} from '../types/currency';
import { HttpService } from './http.service';

@Injectable()
export class CalculatorService {
  _loading = new BehaviorSubject(false);
  currencyMapper: ApiCurrency = {};

  constructor(private httpService: HttpService) {}

  get loading() {
    return this._loading.asObservable();
  }

  set setLoading(flag: boolean) {
    this._loading.next(flag);
  }

  errorManager = (error: HttpErrorResponse) => {
    this.setLoading = false;
    return throwError(() => new Error(error.message));
  }

  getCurrency(): Observable<Currency[]> {
    return this.httpService.getCurrencies().pipe(
      map((element: ApiCurrency) => {
        this.currencyMapper = element;
        return Object.entries(element).map(([code, name]) => ({
          code,
          name: `${code} - (${name})`,
        }));
      }),
      catchError(this.errorManager)
    );
  }

  setResultString(result: ConverterResponse): ConvertionResult {
    const [toCode] = Object.keys(result.rates);
    return {
      from: `${result.amount} ${this.currencyMapper[result.base]}`,
      to: `${result.rates[toCode]} ${this.currencyMapper[toCode]}`,
    };
  }

  mapConverterResponse(convertion: ConverterResponse): Convertion {
    const [[toCode, toAmount]] = Object.entries(convertion.rates);
    return {
      date: convertion.date,
      fromCode: convertion.base,
      fromAmount: convertion.amount,
      toCode,
      toAmount
    };
  }

  convertCurrency(form: CurrencyForm): Observable<ConverterResponse> {
    const { amount, from, to } = form;
    return this.httpService.convertCurrency(amount, from, to).pipe(
      switchMap((convertion: ConverterResponse) => {
        const newConvertion = this.mapConverterResponse(convertion);
        return this.httpService
          .setNewConvertion(newConvertion)
          .pipe(map(() => convertion));
      }),
      catchError(this.errorManager)
    );
  }
}
