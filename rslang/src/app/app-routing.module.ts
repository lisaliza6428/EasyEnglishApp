/* eslint-disable import/named */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { GamesPageComponent } from './core/pages/games-page/games-page.component';
import { StatisticsPageComponent } from './core/pages/statistics-page/statistics-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dictionary',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'games',
    component: GamesPageComponent,
  },
  {
    path: 'statistics',
    component: StatisticsPageComponent,
  },
  {
    path: 'dictionary',
    loadChildren: () => import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
