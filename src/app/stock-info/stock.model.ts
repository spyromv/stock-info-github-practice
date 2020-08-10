export class Stock {
  symbol: string;
  openingValue: number;
  highestValue: number;
  lowestValue: number;
  price: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  changeInValue: number;
  changePercent: string;

  constructor(
    symbol: string,
    openingValue: number,
    highestValue: number,
    lowestValue: number,
    price: number,
    volume: number,
    latestTradingDay: string,
    previousClose: number,
    changeInValue: number,
    changePercent: string
  ) {
    this.symbol = symbol;
    this.openingValue = openingValue;
    this.highestValue = highestValue;
    this.lowestValue = lowestValue;
    this.price = price;
    this.volume = volume;
    this.latestTradingDay = latestTradingDay;
    this.previousClose = previousClose;
    this.changeInValue = changeInValue;
    this.changePercent = changePercent;
  }
}
