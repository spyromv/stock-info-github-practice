import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockInfoService {
  stocksSubject = new Subject<Stock[]>();
  symbols = ['AMD', 'V', 'MSFT', 'SNE', 'KO'];

  constructor(private http: HttpClient) {}

  getStocks(): void {
    const stocks: Stock[] = [];
    const firstUrlPart =
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=';
    const lastUrlPart = '&apikey=D1LFU6TNBA1BULHI';

    for (const symbol of this.symbols) {
      const finalUrl = firstUrlPart + symbol + lastUrlPart;
      this.http.get(finalUrl).subscribe((data) => {
        if (data['Global Quote']['01. symbol']) {
          stocks.push(
            new Stock(
              data['Global Quote']['01. symbol'],
              data['Global Quote']['02. open'],
              data['Global Quote']['03. high'],
              data['Global Quote']['04. low'],
              data['Global Quote']['05. price'],
              data['Global Quote']['06. volume'],
              data['Global Quote']['07. latest trading day'],
              data['Global Quote']['08. previous close'],
              data['Global Quote']['09. change'],
              data['Global Quote']['10. change percent']
            )
          );
          this.stocksSubject.next(stocks);
        }
      });
    }
  }
}
