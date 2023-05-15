import { Injectable } from '@angular/core';
import { TotalPriceService } from '../services/total-price/total-price.service';
import { CheckQualifyService } from '../services/check-qualify/check-qualify.service';
import { TaxService } from '../services/tax-service/tax.service';
import {
  EsppForm,
  Dates,
  Profits,
  Taxes,
  MyForm,
  Results,
} from '../models/formModels';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  public calculationResults$ = new BehaviorSubject<Results | null>(null);

  qualifiedDisposition?: boolean;
  qualifiedCapitalGains?: boolean;
  fairMarketValue?: number;
  paidPricePerStockDiscounted?: number;
  totalProfitUntaxed?: number;

  incomeTaxBracket?: number;
  capitalGainsTaxBracket?: number;

  amountTaxedAsIncome?: number;
  amountTaxedAsCapitalGains?: number;
  totalAmountTaxed?: number;
  totalProfitAfterTaxed?: number;
  constructor(
    private totalPriceService: TotalPriceService,
    private checkQualifyService: CheckQualifyService,
    private TaxService: TaxService
  ) {}

  // how to make the inputs a specific data type like number or moment.Moment

  handleDates(dateObject: Dates) {
    const { offerDate, purchaseDate } = dateObject;
    this.qualifiedDisposition =
      this.checkQualifyService.checkQualify(offerDate);
    this.qualifiedCapitalGains =
      this.checkQualifyService.checkCapitalGains(purchaseDate);
  }

  handleProfits(profitsObject: Profits) {
    const {
      offerPrice,
      purchasePrice,
      lookback,
      numShares,
      discountRate,
      currentStockPrice,
    } = profitsObject;

    const fairMarketValue: number = this.totalPriceService.considerLookback(
      lookback,
      offerPrice,
      purchasePrice
    );

    const paidPriceDiscount: number = this.totalPriceService.getPaidPrice(
      fairMarketValue,
      discountRate
    );

    const totalProfitUntaxed: number =
      this.totalPriceService.getTotalProfitUntaxed(
        paidPriceDiscount,
        numShares,
        currentStockPrice
      );
    this.fairMarketValue = fairMarketValue;
    this.paidPricePerStockDiscounted = paidPriceDiscount;
    this.totalProfitUntaxed = totalProfitUntaxed;
  }

  handleTaxes(taxesObject: Taxes) {
    const { income, taxStatus } = taxesObject;

    const incomeTaxBracket = this.TaxService.incomeTaxBracket(
      income,
      taxStatus
    );
    this.incomeTaxBracket = incomeTaxBracket / 100;

    const capitalGainsTaxBracket = this.TaxService.capitalGainsTaxBracket(
      income,
      taxStatus
    );
    this.capitalGainsTaxBracket = capitalGainsTaxBracket / 100;
  }

  handleTotalProfitTaxed(profitsObject: Profits) {
    const { purchasePrice, currentStockPrice, numShares } = profitsObject;
    let taxedAsIncome = 0;
    let taxedAsCapitalGains = 0;
    if (
      this.fairMarketValue &&
      this.paidPricePerStockDiscounted &&
      this.totalProfitUntaxed &&
      this.incomeTaxBracket &&
      this.capitalGainsTaxBracket
    ) {
      if (this.qualifiedDisposition && this.qualifiedCapitalGains) {
        // ^ QUALIFIED disposition AND QUALIFIED FOR CAPITAL GAINS

        // ^( discounted - undiscouted * taxIncome )  * shares sold
        // const totalProfitTaxed = this.totalProfitUntaxed - this.totalProfitUntaxed * this.incomeTaxBracket;

        const perStockTaxedAsIncome =
          (this.fairMarketValue - this.paidPricePerStockDiscounted) *
          this.incomeTaxBracket;

        taxedAsIncome = perStockTaxedAsIncome * numShares;

        // ^( salePrice - undiscouted * captialGains ) * shares sold

        const perStockTaxedAsCapitalGains =
          (currentStockPrice - this.fairMarketValue) *
          this.capitalGainsTaxBracket;

        taxedAsCapitalGains = perStockTaxedAsCapitalGains * numShares;

        console.log('qualified disposition and capital gains');
      } else if (this.qualifiedCapitalGains) {
        // ^ DISQUALIFIED disposition BUT QUALIFIED FOR CAPITAL GAINS

        // ^ (purchase price - discount * income tax rate) * shares sold
        // const totalProfitTaxed = this.totalProfitUntaxed - this.totalProfitUntaxed * this.incomeTaxBracket;
        const perStockTaxedAsIncome =
          (purchasePrice - this.paidPricePerStockDiscounted) *
          this.incomeTaxBracket;

        // ^ (sale price - purchase price * captialGains) * shares sold
        const perStockTaxedAsCapitalGains =
          (currentStockPrice - purchasePrice) * this.capitalGainsTaxBracket;
        taxedAsCapitalGains = perStockTaxedAsCapitalGains * numShares;

        console.log('qualified captial gains');
      } else {
        // ^ DISQUALIFIED disposition
        console.log('neither qualified disposition nor capital gains');
        // ^ (sale price - discounted * income tax) * shares sold
        const perStockTaxedAsIncome =
          (currentStockPrice - this.paidPricePerStockDiscounted) *
          this.incomeTaxBracket;
        taxedAsIncome = perStockTaxedAsIncome * numShares;
      }
      // ^ How much you paid in taxes for income and capital gains
      this.amountTaxedAsIncome = taxedAsIncome;
      this.amountTaxedAsCapitalGains = taxedAsCapitalGains;
      // ^ How much you paid in taxes total
      this.totalAmountTaxed =
        this.amountTaxedAsCapitalGains + this.amountTaxedAsIncome;
      // ^ How much profit you made after taxes
      this.totalProfitAfterTaxed =
        this.totalProfitUntaxed - this.totalAmountTaxed;

      this.sendResults();
    }
  }

  sendResults() {
    if (
      this.qualifiedDisposition &&
      this.qualifiedCapitalGains &&
      this.fairMarketValue &&
      this.paidPricePerStockDiscounted &&
      this.totalProfitUntaxed &&
      this.incomeTaxBracket &&
      this.capitalGainsTaxBracket &&
      this.amountTaxedAsIncome &&
      this.amountTaxedAsCapitalGains &&
      this.totalAmountTaxed &&
      this.totalProfitAfterTaxed
    ) {
      const results: Results = {
        qualifiedDisposition: this.qualifiedDisposition,
        qualifiedCapitalGains: this.qualifiedCapitalGains,
        fairMarketValue: this.fairMarketValue,
        paidPricePerStockDiscounted: this.paidPricePerStockDiscounted,
        totalProfitUntaxed: this.totalProfitUntaxed,
        incomeTaxBracket: this.incomeTaxBracket,
        capitalGainsTaxBracket: this.capitalGainsTaxBracket,
        amountTaxedAsIncome: this.amountTaxedAsIncome,
        amountTaxedAsCapitalGains: this.amountTaxedAsCapitalGains,
        totalAmountTaxed: this.totalAmountTaxed,
        totalProfitAfterTaxed: this.totalProfitAfterTaxed,
      };

      this.calculationResults$.next(results);
    }
  }
}
