export interface ConverterResponse {
    amount: number;
    base: string;
    date: string;
    rates: {
      [correncyCode: string]: number;
    };
  }
  
  export interface Convertion {
    date: string;
    fromCode: string;
    fromAmount: number;
    toCode: string;
    toAmount: number;
  }
  
  export interface ConvertionResult {
    from: string;
    to: string;
  }