import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaxService {
  incomeTaxBrackets = [10, 12, 22, 24, 32, 35, 37];
  singleIncomeTaxBrackets = [11000, 44725, 95375, 182100, 231250, 578125];
  marriedJointIncomeTaxBrackets = [
    22000, 89450, 190750, 364200, 462500, 693750,
  ];
  marriedSeparateIncomeTaxBrackets = [
    11000, 44725, 95375, 182100, 231250, 346875,
  ];
  headOfHouseholdIncomeTaxBrackets = [
    15700, 59850, 95350, 182100, 231250, 578100,
  ];

  // capital gains tax brackets
  capitalGainsTaxBrackets = [0, 15, 20];
  singleCapitalGainsTaxBrackets = [44625, 492301];
  marriedJointCapitalGainsTaxBrackets = [89251, 553851];
  marriedSeparateCapitalGainsTaxBrackets = [44626, 276901];
  headOfHouseholdCapitalGainsTaxBrackets = [59751, 523051];

  constructor() {}
  // finds the tax bracket for both income and capital gains
  getTaxBracket = (
    income: number,
    taxStatusMaximums: number[],
    taxBrackets: number[]
  ): number => {
    for (let i = 0; i < taxStatusMaximums.length; i++) {
      if (income < taxStatusMaximums[i]) {
        return taxBrackets[i];
      }
    }
    return taxBrackets[taxBrackets.length - 1];
  };

  incomeTaxBracket(income: number, taxStatus: string): number {
    if (taxStatus === 'Single') {
      return this.getTaxBracket(
        income,
        this.singleIncomeTaxBrackets,
        this.incomeTaxBrackets
      );
    } else if (taxStatus === 'Married Filing Jointly') {
      return this.getTaxBracket(
        income,
        this.marriedJointIncomeTaxBrackets,
        this.incomeTaxBrackets
      );
    } else if (taxStatus === 'Married Filing Separately') {
      return this.getTaxBracket(
        income,
        this.marriedSeparateIncomeTaxBrackets,
        this.incomeTaxBrackets
      );
    } else {
      return this.getTaxBracket(
        income,
        this.headOfHouseholdIncomeTaxBrackets,
        this.incomeTaxBrackets
      );
    }
  }

  // capital gains tax bracket
  capitalGainsTaxBracket(income: number, taxStatus: string): number {
    if (taxStatus === 'Single') {
      return this.getTaxBracket(
        income,
        this.singleCapitalGainsTaxBrackets,
        this.capitalGainsTaxBrackets
      );
    } else if (taxStatus === 'Married Filing Jointly') {
      return this.getTaxBracket(
        income,
        this.marriedJointCapitalGainsTaxBrackets,
        this.capitalGainsTaxBrackets
      );
    } else if (taxStatus === 'Married Filing Separately') {
      return this.getTaxBracket(
        income,
        this.marriedSeparateCapitalGainsTaxBrackets,
        this.capitalGainsTaxBrackets
      );
    } else {
      return this.getTaxBracket(
        income,
        this.headOfHouseholdCapitalGainsTaxBrackets,
        this.capitalGainsTaxBrackets
      );
    }
  }

  // how much is getting taxed as income
  getAmountTaxedAsIncome(
    fmv: number,
    paidAmount: number,
    numShares: number,
    incomeTaxBracket: number
  ) {
    const gain = (fmv - paidAmount) * numShares;
    const amountTaxedAsIncome = gain * (incomeTaxBracket / 100);
    return amountTaxedAsIncome;
  }

  // how much is getting taxed as capital gains
  getAmountTaxedAsCapitalGains(
    fmv: number,
    paidAmount: number,
    numShares: number,
    capitalGainsTaxBracket: number
  ) {
    const gain = (fmv - paidAmount) * numShares;
    const amountTaxedAsCapitalGains = gain * (capitalGainsTaxBracket / 100);
    return amountTaxedAsCapitalGains;
  }
}
