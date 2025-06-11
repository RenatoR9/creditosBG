import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'createCreditRequest',
    loadComponent: () => import('./modules/credit-requests/credit-requests.component').then(m => m.CreditRequestsComponent)
  },
  {
    path: '',
    redirectTo: '/createCreditRequest',
    pathMatch: 'full'
  }
];
