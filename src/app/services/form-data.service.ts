import { Injectable } from '@angular/core';
import { TotalPriceService } from '../services/total-price/total-price.service';
import { CheckQualifyService } from '../services/check-qualify/check-qualify.service';
import { TaxService } from '../services/tax-service/tax.service';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
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
  ) {}
}
