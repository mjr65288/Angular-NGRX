import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Bar2RoutingModule } from './bar2-routing.module';
import { Bar2Component } from './bar2.component';


@NgModule({
  declarations: [
    Bar2Component
  ],
  imports: [
    CommonModule,
    Bar2RoutingModule
  ]
})
export class Bar2Module { }
