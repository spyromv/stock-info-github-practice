import { StockInfoService } from './stock-info/stock-info.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'stock-info-practice';

  constructor(private stockInfoService: StockInfoService) {}

  ngOnInit(): void {
    this.stockInfoService.fetchStockQueries();
  }
}
