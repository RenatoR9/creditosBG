import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'createCreditRequest',
    loadComponent: () => import('./modules/credit-requests/credit-requests.component').then(m => m.CreditRequestsComponent)
  },
    {
    path: 'viewCreditRequest',
    loadComponent: () => import('./modules/credit-requests/view-user-request/view-user-request.component').then(m => m.ViewUserRequestComponent)
  },
  {
    path: '',
    redirectTo: '/createCreditRequest',
    pathMatch: 'full'
  }
];
