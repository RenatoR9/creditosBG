import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'createCreditRequest',
    loadComponent: () => import('./modules/credit-requests/credit-requests.component').then(m => m.CreditRequestsComponent)
  },
  {
    path: 'viewCreditRequest',
    loadComponent: () => import('./modules/credit-requests/view-user-request/view-user-request.component').then(m => m.ViewUserRequestComponent)
  }, 
  {
    path: 'viewHistoryCreditRequest',
    loadComponent: () => import('./modules/view-history-credit-request/view-history-credit-request.component').then(m => m.ViewHistoryCreditRequestComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
