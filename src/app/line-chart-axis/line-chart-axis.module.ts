import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineChartAxisRoutingModule } from './line-chart-axis-routing.module';
import { LineChartAxisComponent } from './line-chart-axis.component';


@NgModule({
  declarations: [
    LineChartAxisComponent
  ],
  imports: [
    CommonModule,
    LineChartAxisRoutingModule
  ]
})
export class LineChartAxisModule { }
