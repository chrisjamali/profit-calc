import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TotalPriceService } from '../services/total-price/total-price.service';
import { CheckQualifyService } from '../services/check-qualify/check-qualify.service';
import { TaxService } from '../services/tax-service/tax.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormDataService } from '../services/form-data.service';
import { nonNullObject } from '../utiles/typeGuard';
import { EsppForm, Dates, Profits, Taxes, MyForm } from '../models/formModels';

@Component({
  selector: 'app-espp-profit-form',
  templateUrl: './espp-profit-form.component.html',
  styleUrls: ['./espp-profit-form.component.scss'],
  providers: [DatePipe],
})
export class EsppProfitFormComponent {
  qualifiedDisposition?: boolean;
  qualifiedCapitalGains?: boolean;
  fairMarketValue?: number;
  paidPricePerStockDiscounted?: number;
  totalProfitUntaxed?: number;
  totalProfitTaxed?: number;
  incomeTaxBracket?: number;
  capitalGainsTaxBracket?: number;

  // how to make the inputs a specific data type like number or moment.Moment
  esppForm = this.form.group({
    dates: this.form.group({
      offerDate: new FormControl<moment.Moment | null>(
        null,
        Validators.required
      ),
      purchaseDate: new FormControl<moment.Moment | null>(
        null,
        Validators.required
      ),
    }),
    profits: this.form.group({
      offerPrice: new FormControl<number | null>(null, Validators.required),
      purchasePrice: new FormControl<number | null>(null, Validators.required),
      lookback: new FormControl<boolean | null>(null, Validators.required),
      numShares: new FormControl<number | null>(null, Validators.required),
      discountRate: new FormControl<number | null>(null, Validators.required),
      currentStockPrice: new FormControl<number | null>(
        null,
        Validators.required
      ),
    }),
    taxes: this.form.group({
      income: new FormControl<number | null>(null, Validators.required),
      taxStatus: new FormControl<string | null>(null, Validators.required),
    }),
  });

  constructor(
    private formDataService: FormDataService,
    private form: FormBuilder
  ) {
    this.prePopulateForm();
  }

  taxFilingStatus = [
    'Single',
    'Married Filing Jointly',
    'Married Filing Separately',
    'Head of Household',
  ];

  get controls() {
    return this.esppForm.controls;
  }

  prePopulateForm() {
    this.esppForm.setValue({
      dates: {
        offerDate: moment('2023-01-01'),
        purchaseDate: moment('2023-05-01'),
      },
      profits: {
        offerPrice: 50.8,
        purchasePrice: 25.4,
        lookback: true,
        numShares: 100,
        discountRate: 15,
        currentStockPrice: 100,
      },

      taxes: {
        income: 200000,
        taxStatus: 'Single',
      },
    });
  }
  onSubmit() {
    const formValues = this.esppForm.value;

    console.log(formValues.dates);

    console.log(this.esppForm);

    if (nonNullObject<MyForm>(formValues)) {
      console.log(formValues);
      const dates = formValues.dates;
      const profits = formValues.profits;
      const taxes = formValues.taxes;
      if (nonNullObject<Dates>(dates)) {
        this.formDataService.handleDates(dates);
      }

      if (nonNullObject<Profits>(profits)) {
        this.formDataService.handleProfits(profits);
      }

      if (nonNullObject<Taxes>(taxes)) {
        this.formDataService.handleTaxes(taxes);
      }

      if (nonNullObject<Profits>(profits)) {
        this.formDataService.handleTotalProfitTaxed(profits);
      }
      console.log(this.formDataService, 'FROM COMPONENT');
    }
  }
}
