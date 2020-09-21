import { Stock } from './stock.model';
import { StockInfoService } from './stock-info.service';
import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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

  constructor(
    private stockInfoService: StockInfoService,
    private router: Router
  ) {}

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

  onGoToQueries(): void {
    this.router.navigate(['/queries']);
  }
}
