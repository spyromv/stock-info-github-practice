import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockInfoService {
  stocksSubject = new Subject<Stock[]>();
  stockQueries = [
    { symbol: 'AMD', boughtValue: 85.06 },
    { symbol: 'V', boughtValue: 196.36 },
    { symbol: 'MSFT', boughtValue: 211.4 },
  ];

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
          stocks.push(this.buildStock(dataToParse, query.boughtValue));
          this.stocksSubject.next(stocks);
        }
      });
    }
  }

  private buildStock(dataToParse, boughtValue: number): Stock {
    const symbol = dataToParse['01. symbol'];
    const open: number = +dataToParse['02. open'];
    const high: number = +dataToParse['03. high'];
    const low: number = +dataToParse['04. low'];
    const price: number = +dataToParse['05. price'];
    const volume = dataToParse['06. volume'];
    const latestTrade = dataToParse['07. latest trading day'];
    const prevClose: number = +dataToParse['08. previous close'];
    const change: number = +dataToParse['09. change'];
    const changePercentage = dataToParse['10. change percent'];

    const newStock = new Stock(
      symbol,
      +open.toFixed(2),
      +high.toFixed(2),
      +low.toFixed(2),
      +price.toFixed(2),
      volume,
      latestTrade,
      +prevClose.toFixed(2),
      +change.toFixed(2),
      changePercentage,
      boughtValue
    );
    return newStock;
  }
}
