export class StockQuery {
  symbol: string;
  boughtAt: number;
  quantity: number;

  constructor(symbol: string, boughtAt: number, quantity: number) {
    this.symbol = symbol;
    this.boughtAt = boughtAt;
    this.quantity = quantity;
  }
}
