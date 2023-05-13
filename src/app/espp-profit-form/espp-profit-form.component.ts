import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TotalPriceService } from '../services/total-price/total-price.service';
import { CheckQualifyService } from '../services/check-qualify/check-qualify.service';
import { TaxService } from '../services/tax-service/tax.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

interface EsppForm {
  offerPrice: number;
  purchasePrice: number;
  offerDate: moment.Moment;
  purchaseDate: moment.Moment;
  lookback: boolean;
  numShares: number;
  discountRate: number;
  currentStockPrice: number;
  income: number;
  taxStatus: string;
}
@Component({
  selector: 'app-espp-profit-form',
  templateUrl: './espp-profit-form.component.html',
  styleUrls: ['./espp-profit-form.component.scss'],
  providers: [DatePipe],
})
export class EsppProfitFormComponent {
  // @Input() offerPrice?: number;
  // @Input() purchasePrice?: number;
  // @Input() offerDate?: moment.Moment;
  // @Input() purchaseDate?: moment.Moment;
  // @Input() lookback?: boolean;
  // @Input() numShares?: number;
  // @Input() discountRate?: number;
  // @Input() currentStockPrice?: number;
  // @Input() income?: number;
  // @Input() taxStatus?: string;

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
    private totalPriceService: TotalPriceService,
    private checkQualifyService: CheckQualifyService,
    private TaxService: TaxService,
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

  checkQualify(offerDate: moment.Moment, purchaseDate: moment.Moment) {
    const qualifiedDisposition =
      this.checkQualifyService.checkQualify(offerDate);
    const qualifiedCapitalGains =
      this.checkQualifyService.checkCapitalGains(purchaseDate);

    this.qualifiedDisposition = qualifiedDisposition;
    this.qualifiedCapitalGains = qualifiedCapitalGains;
  }

  getTotalProfit(
    offerPrice: number,
    purchasePrice: number,
    numShares: number,
    discountRate: number,
    currentStockPrice: number,
    lookback: boolean
  ) {
    const fairMarketValue: number = this.totalPriceService.considerLookback(
      lookback,
      offerPrice,
      purchasePrice
    );

    const paidPriceDiscount: number = this.totalPriceService.getPaidPrice(
      fairMarketValue,
      discountRate
    );

    const totalProfitUntaxed: number = this.totalPriceService.getTotalProfit(
      paidPriceDiscount,
      numShares,
      currentStockPrice
    );
    this.fairMarketValue = fairMarketValue;
    this.paidPricePerStockDiscounted = paidPriceDiscount;
    this.totalProfitUntaxed = totalProfitUntaxed;
  }

  getIncomeTaxBracket(income: number, taxStatus: string) {
    const taxBracket = this.TaxService.incomeTaxBracket(income, taxStatus);
    this.incomeTaxBracket = taxBracket;
  }

  getCapitalGainsTaxBracket(income: number, taxStatus: string) {
    const taxBracket = this.TaxService.capitalGainsTaxBracket(
      income,
      taxStatus
    );
    this.capitalGainsTaxBracket = taxBracket;
  }

  test<Form extends EsppForm>(f?: Form, o?: moment.Moment, p?: moment.Moment) {
    console.log(f, o, p);
  }

  // send(
  //   esppForm: EsppForm,
  //   offerDate?: moment.Moment,
  //   purchaseDate?: moment.Moment
  // ) {
  //   const hasRequiredProperties =
  //     esppForm &&
  //     esppForm.offerPrice !== undefined &&
  //     esppForm.purchasePrice !== undefined &&
  //     esppForm.numShares !== undefined &&
  //     esppForm.discountRate !== undefined &&
  //     esppForm.currentStockPrice !== undefined &&
  //     esppForm.lookback !== undefined &&
  //     esppForm.income !== undefined &&
  //     esppForm.taxStatus !== undefined;

  //   if (hasRequiredProperties) {
  //     const {
  //       offerPrice,
  //       purchasePrice,
  //       numShares,
  //       discountRate,
  //       currentStockPrice,
  //       lookback,
  //       income,
  //       taxStatus,
  //     } = esppForm;

  //     this.getIncomeTaxBracket(income, taxStatus);
  //     this.getCapitalGainsTaxBracket(income, taxStatus);

  //     this.getTotalProfit(
  //       offerPrice,
  //       purchasePrice,
  //       numShares,
  //       discountRate,
  //       currentStockPrice,
  //       lookback
  //     );
  //   }
  //   if (offerDate && purchaseDate) {
  //     this.checkQualify(offerDate, purchaseDate);
  //   }

  //   console.log('AFTER SEND', this);
  //   for (const key in this) {
  //     console.log(key, typeof this[key]);
  //   }
  // }

  get controls() {
    return this.esppForm.controls;
  }

  prePopulateForm() {
    this.esppForm.setValue({
      dates: {
        offerDate: moment('2019-01-01'),
        purchaseDate: moment('2021-01-01'),
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
  logger<T>(stuff: T) {
    const dates = this.esppForm.get('dates');
    const profits = this.esppForm.get('profits');
    const taxes = this.esppForm.get('taxes');

    console.log(dates, profits, taxes);

    return stuff;
  }
}
