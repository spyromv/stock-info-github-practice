import { Stock } from './stock.model';
import { StockInfoService } from './stock-info.service';
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class StockInfoComponent implements OnInit {
  stocks: Stock[] = [];
  isTimeOut = false;

  constructor(private stockInfoService: StockInfoService) {}

  ngOnInit(): void {
    this.stockInfoService.stocksSubject.subscribe((stocks) => {
      this.stocks = stocks;
    });
  }

  onRefresh(): void {
    this.stockInfoService.getStocks();
    this.isTimeOut = true;
    setTimeout(() => (this.isTimeOut = false), 60000);
  }
}
