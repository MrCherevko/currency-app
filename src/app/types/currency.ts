export type ApiCurrency = { [currencyCode: string]: string };
export type Currency = { code: string; name: string };
export interface CurrencyForm {
  amount: string;
  from: string;
  to: string;
}
