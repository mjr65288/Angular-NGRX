import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartAxisComponent } from './line-chart-axis.component';

const routes: Routes = [{ path: '', component: LineChartAxisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineChartAxisRoutingModule { }
