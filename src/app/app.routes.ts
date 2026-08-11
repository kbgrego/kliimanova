import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultRequestComponent } from './pages/consult-request/consult-request.component';
import { PricesComponent } from './pages/prices/prices.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { pageName: '' }  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)
  },
  { path: 'cooling', component: PricesComponent, data: { pageName: 'Pricing', serviceCode: 'COOLING', title: 'Cooling installation' } },
  { path: 'heating', component: PricesComponent, data: { pageName: 'Pricing', serviceCode: 'HEATING', title: 'Heating installation' } },
  { path: 'heating-pumps', component: PricesComponent, data: { pageName: 'Pricing', serviceCode: 'HEATING_PUMPS', title: 'Standard installation' } },
  { path: 'request', component: ConsultRequestComponent, data: { pageName: '' } },
  { path: 'admin/login', loadComponent: () => import('./pages/admin-login/admin-login.component').then(m => m.AdminLogin) },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { pageName: 'Admin' } },
  { path: '**', redirectTo: 'home' }
];
