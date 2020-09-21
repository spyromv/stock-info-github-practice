import { StockInfoQueryDataComponent } from './stock-info-query-data/stock-info-query-data.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: StockInfoComponent, pathMatch: 'full' },
  { path: 'queries', component: StockInfoQueryDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
