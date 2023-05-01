import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { TotalPriceService } from '../services/total-price.service';
import { CheckQualifyService } from '../services/check-qualify.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-espp-profit-form',
  templateUrl: './espp-profit-form.component.html',
  styleUrls: ['./espp-profit-form.component.scss'],
  providers: [DatePipe, CheckQualifyService],
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
  constructor(
    private totalPriceService: TotalPriceService,
    private checkQualifyService: CheckQualifyService
  ) {}

  taxFilingStatus = [
    'Single',
    'Married',
    'Married Filing Separately',
    'Head of Household',
    'Widower',
  ];

  checkQualify(offerDate: moment.Moment, purchaseDate: moment.Moment) {

    const qualifiedDisposition = this.checkQualifyService.checkQualify(offerDate);
    const qualifiedCapitalGains = this.checkQualifyService.checkCapitalGains(purchaseDate);
    console.log(qualifiedDisposition, 'IS IT 2 years');
    console.log(qualifiedCapitalGains, 'IS IT 1 year');
  }

  send(offerDate?: moment.Moment, purchaseDate?: moment.Moment) {
    if (offerDate && purchaseDate) {
      this.checkQualify(offerDate, purchaseDate);
    } else {
      return;
    }
  }

  logger<T>(stuff: T) {
    console.log(stuff);
  }
}
