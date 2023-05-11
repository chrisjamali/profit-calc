import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TotalPriceService {


  considerLookback(
    lookback: boolean,
    offerPrice: number,
    purchasePrice: number
  ): number {
    // if no lookback, paidPrice is purchasePrice other wise it is the lower of the two
    const paidPriceNoDiscount: number = !lookback
      ? purchasePrice
      : offerPrice < purchasePrice
      ? offerPrice
      : purchasePrice;

    return paidPriceNoDiscount;
  }

 getPaidPrice(
    paidPriceNoDiscount: number,
    discountRate: number
  ): number {
    // apply the discount rate to the paidPriceNoDiscount
    const discount = paidPriceNoDiscount * (discountRate / 100);
    return paidPriceNoDiscount - discount;
  }

  getTotalProfit(
    paidPrice: number,
    numShares: number,
    currentStockPrice: number
  ): number {

    const totalProfit = (currentStockPrice - paidPrice) * numShares;

    return totalProfit;
  }


}
