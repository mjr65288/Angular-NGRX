import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then((m)=> m.CounterModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then((m)=> m.PostsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'bar', loadChildren: () => import('./bar/bar.module').then(m => m.BarModule) },
  { path: 'bar2', loadChildren: () => import('./bar2/bar2.module').then(m => m.Bar2Module) },
  { path: 'scatter-plot', loadChildren: () => import('./scatter-plot/scatter-plot.module').then(m => m.ScatterPlotModule) },
  { path: 'line-chart', loadChildren: () => import('./line-chart/line-chart.module').then(m => m.LineChartModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
