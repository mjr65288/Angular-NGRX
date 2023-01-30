import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bar2Component } from './bar2.component';

const routes: Routes = [{ path: '', component: Bar2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Bar2RoutingModule { }
