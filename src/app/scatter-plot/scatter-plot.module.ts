import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScatterPlotRoutingModule } from './scatter-plot-routing.module';
import { ScatterPlotComponent } from './scatter-plot.component';


@NgModule({
  declarations: [
    ScatterPlotComponent
  ],
  imports: [
    CommonModule,
    ScatterPlotRoutingModule
  ]
})
export class ScatterPlotModule { }
