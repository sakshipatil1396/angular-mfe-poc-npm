import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemoteModule('mfeDashboard', './routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule('mfeProducts', './routes').then(
        (m) => m.PRODUCTS_ROUTES
      ),
  },
  { path: '**', redirectTo: '' },
];
