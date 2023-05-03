import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TotalPriceService } from '../services/total-price.service';
import { CheckQualifyService } from '../services/check-qualify/check-qualify.service';
import { TaxService } from '../services/tax-service/tax.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

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
  @Input() offerPrice?: number;
  @Input() purchasePrice?: number;
  @Input() offerDate?: moment.Moment;
  @Input() purchaseDate?: moment.Moment;
  @Input() lookback?: boolean;
  @Input() numShares?: number;
  @Input() discountRate?: number;
  @Input() currentStockPrice?: number;
  @Input() income?: number;
  @Input() taxStatus?: string;

  qualifiedDisposition?: boolean;
  qualifiedCapitalGains?: boolean;
  fairMarketValue?: number;
  paidPricePerStockDiscounted?: number;
  totalProfitUntaxed?: number;
  totalProfitTaxed?: number;
  incomeTaxBracket?: number;
  capitalGainsTaxBracket?: number;
  constructor(
    private totalPriceService: TotalPriceService,
    private checkQualifyService: CheckQualifyService,
    private TaxService: TaxService
  ) {
    this.offerPrice = 50.8;
    this.purchasePrice = 59.8;
    this.offerDate = moment('2020-01-01');
    this.purchaseDate = moment('2021-01-01');
    this.lookback = true;
    this.numShares = 100;
    this.discountRate = 15;
    this.currentStockPrice = 100;
    this.income = 200000;
    this.taxStatus = 'Single';
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

  send(
    esppForm: EsppForm,
    offerDate?: moment.Moment,
    purchaseDate?: moment.Moment
  ) {
    const hasRequiredProperties =
      esppForm &&
      esppForm.offerPrice !== undefined &&
      esppForm.purchasePrice !== undefined &&
      esppForm.numShares !== undefined &&
      esppForm.discountRate !== undefined &&
      esppForm.currentStockPrice !== undefined &&
      esppForm.lookback !== undefined &&
      esppForm.income !== undefined &&
      esppForm.taxStatus !== undefined;

    if (hasRequiredProperties) {
      const {
        offerPrice,
        purchasePrice,
        numShares,
        discountRate,
        currentStockPrice,
        lookback,
        income,
        taxStatus,
      } = esppForm;

      this.getIncomeTaxBracket(income, taxStatus);
      this.getCapitalGainsTaxBracket(income, taxStatus);

      this.getTotalProfit(
        offerPrice,
        purchasePrice,
        numShares,
        discountRate,
        currentStockPrice,
        lookback
      );
    }
    if (offerDate && purchaseDate) {
      this.checkQualify(offerDate, purchaseDate);
    }

    console.log('AFTER SEND', this);
    for (let key in this) {
      console.log(key, typeof this[key]);
    }
  }

  logger<T>(stuff: T) {
    console.log(stuff);
  }
}
