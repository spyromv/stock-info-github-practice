import { StockInfoService } from './../stock-info/stock-info.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StockQuery } from './stock-query.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-info-query-data',
  templateUrl: './stock-info-query-data.component.html',
  styleUrls: ['./stock-info-query-data.component.css'],
})
export class StockInfoQueryDataComponent implements OnInit, OnDestroy {
  stockDataForm: FormGroup;
  stockQueries: StockQuery[];
  stockQuerySubscription: Subscription;
  itemCount = 0;

  constructor(
    private stockInfoService: StockInfoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.stockQuerySubscription = this.stockInfoService.querySubject.subscribe(
      (stockQueries) => {
        this.stockQueries = stockQueries;
      }
    );
    this.stockQueries = this.stockInfoService.getStockQueries();
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.stockQuerySubscription) {
      this.stockQuerySubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    const newQueries: StockQuery[] = [];
    for (const ctrl of this.getControls()) {
      newQueries.push(ctrl.value);
    }
    this.stockInfoService.setStockQueries(newQueries);
    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // tslint:disable-next-line: typedef
  getControls() {
    // a getter!
    return (this.stockDataForm.get('queries') as FormArray).controls;
  }

  onAddQueryItem(): void {
    (this.stockDataForm.get('queries') as FormArray).push(
      new FormGroup({
        symbol: new FormControl(null, Validators.required),
        boughtAt: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/),
        ]),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
    this.itemCount++;
  }

  onDeleteQueryItem(index: number): void {
    (this.stockDataForm.get('queries') as FormArray).removeAt(index);
    this.itemCount--;
  }

  private initForm(): void {
    const queryFormArray = new FormArray([]);
    if (this.stockQueries.length > 0) {
      this.itemCount = this.stockQueries.length;
      for (const stockQuery of this.stockQueries) {
        queryFormArray.push(
          new FormGroup({
            symbol: new FormControl(stockQuery.symbol, Validators.required),
            boughtAt: new FormControl(stockQuery.boughtAt, [
              Validators.required,
              Validators.pattern(
                /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/
              ),
            ]),
            quantity: new FormControl(stockQuery.quantity, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
    }

    this.stockDataForm = new FormGroup({ queries: queryFormArray });
  }
}
