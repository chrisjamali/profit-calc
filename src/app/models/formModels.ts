export interface EsppForm {
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

export interface Dates {
  offerDate: moment.Moment;
  purchaseDate: moment.Moment;
}

export interface Profits {
  offerPrice: number;
  purchasePrice: number;
  lookback: boolean;
  numShares: number;
  discountRate: number;
  currentStockPrice: number;
}

export interface Taxes {
  income: number;
  taxStatus: string;
}

export interface MyForm {
  dates: Dates;
  profits: Profits;
  taxes: Taxes;
}

export interface Results {
  qualifiedDisposition: boolean;
  qualifiedCapitalGains: boolean;
  fairMarketValue: number;
  paidPricePerStockDiscounted: number;
  totalProfitUntaxed: number;

  incomeTaxBracket: number;
  capitalGainsTaxBracket: number;

  amountTaxedAsIncome: number;
  amountTaxedAsCapitalGains: number;
  totalAmountTaxed: number;
  totalProfitAfterTaxed: number;
}
