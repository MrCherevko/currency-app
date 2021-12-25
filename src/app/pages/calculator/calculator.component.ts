import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ConverterResponse, ConvertionResult } from 'src/app/types/convertion';
import { Currency, CurrencyForm } from 'src/app/types/currency';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  
  currencies: Currency[] = [];
  form?: FormGroup;
  convertion?: string;
  resultString?: ConvertionResult;

  constructor(public calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.calculatorService.setLoading = true;
    this.form = this.createForm();
    this.calculatorService.getCurrency().subscribe((currency) => {
      this.calculatorService.setLoading = false;
      this.currencies = currency
    });
  }

  createForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl(1, Validators.required),
      from: new FormControl('USD', Validators.required),
      to: new FormControl('ILS', Validators.required)
    })
  }

  switchCoins($event: Event) {
    $event.preventDefault();
    const {from, to} = this.form?.value;
    this.form?.get('from')?.setValue(to);
    this.form?.get('to')?.setValue(from);
  }

  setResultString(result: ConverterResponse) {
    this.resultString = this.calculatorService.setResultString(result);
  }

  onSubmit() {
    this.calculatorService.setLoading = true;
    this.calculatorService.convertCurrency(this.form?.value as CurrencyForm)
    .subscribe((result) => {
      this.calculatorService.setLoading = false;
      this.setResultString(result);
    });
  }

}


