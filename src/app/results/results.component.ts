import { Component, Input } from '@angular/core';
import { FormDataService } from '../services/form-data.service';
import { Results } from '../models/formModels';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  calculationsComplete = false;

  @Input() numShares?: number | null;
  @Input() salePrice?: number | null;
  @Input() discountRate?: number | null;
  @Input() purchasePrice?: number | null;

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

  constructor(private formDataService: FormDataService) {
    this.formDataService.calculationResults$.subscribe((results) => {
      if (results) {
        console.log(results, 'from results', this);

        this.qualifiedDisposition = results.qualifiedDisposition;
        this.qualifiedCapitalGains = results.qualifiedCapitalGains;
        this.fairMarketValue = results.fairMarketValue;
        this.paidPricePerStockDiscounted = results.paidPricePerStockDiscounted;
        this.totalProfitUntaxed = results.totalProfitUntaxed;

        this.incomeTaxBracket = results.incomeTaxBracket;
        this.capitalGainsTaxBracket = results.capitalGainsTaxBracket;

        this.amountTaxedAsIncome = results.amountTaxedAsIncome;
        this.amountTaxedAsCapitalGains = results.amountTaxedAsCapitalGains;
        this.totalAmountTaxed = results.totalAmountTaxed;
        this.totalProfitAfterTaxed = results.totalProfitAfterTaxed;
        this.calculationsComplete = true;
      }
    });

    // this.formDataService.resetCalculationCompleted();
  }
}
// }
