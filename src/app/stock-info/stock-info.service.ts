import { StockQuery } from './../stock-info-query-data/stock-query.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockInfoService {
  stocksSubject = new Subject<Stock[]>();
  querySubject = new Subject<StockQuery[]>();

  stockQueries: StockQuery[] = [];

  constructor(private http: HttpClient) {}

  getStocks(): void {
    const stocks: Stock[] = [];
    const firstUrlPart =
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    const lastUrlPart = '&apikey=D1LFU6TNBA1BULHI';

    for (const query of this.stockQueries) {
      const finalUrl = firstUrlPart + query.symbol + lastUrlPart;
      this.http.get(finalUrl).subscribe((data) => {
        const dataToParse = data['Global Quote'];
        if (dataToParse) {
          stocks.push(
            this.buildStock(dataToParse, query.boughtAt, query.quantity)
          );
        }
      });
    }
    this.stocksSubject.next(stocks);
  }

  getStockQueries(): StockQuery[] {
    return this.stockQueries;
  }

  setStockQueries(newQueries: StockQuery[]): void {
    this.stockQueries = newQueries;
    this.storeStockQueries();
    this.querySubject.next(this.stockQueries);
  }

  fetchStockQueries(): void {
    this.http
      .get('https://stock-info-practice.firebaseio.com/queries.json')
      .subscribe((queries: StockQuery[]) => {
        this.setStockQueries(queries);
      });
  }

  storeStockQueries(): void {
    this.http
      .put(
        'https://stock-info-practice.firebaseio.com/queries.json',
        this.stockQueries
      )
      .subscribe();
  }

  private buildStock(dataToParse, boughtAt: number, quantity: number): Stock {
    const symbol = dataToParse['01. symbol'];
    const open: number = +dataToParse['02. open'];
    const high: number = +dataToParse['03. high'];
    const low: number = +dataToParse['04. low'];
    const price: number = +dataToParse['05. price'];
    const volume = dataToParse['06. volume'];
    const latestTrade: string = dataToParse['07. latest trading day'];
    const prevClose: number = +dataToParse['08. previous close'];
    const change: number = +dataToParse['09. change'];
    const changePercentage = dataToParse['10. change percent'];

    const splitLatestTrade = latestTrade.split('-');
    const flippedLatestTrade =
      splitLatestTrade[2] +
      '-' +
      splitLatestTrade[1] +
      '-' +
      splitLatestTrade[0];

    const newStock = new Stock(
      symbol,
      +open.toFixed(2),
      +high.toFixed(2),
      +low.toFixed(2),
      +price.toFixed(2),
      volume,
      flippedLatestTrade,
      +prevClose.toFixed(2),
      +change.toFixed(2),
      changePercentage,
      boughtAt,
      quantity
    );
    return newStock;
  }
}
