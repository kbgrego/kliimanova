import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Projects } from './pages/projects/projects';
import { ConsultRequestComponent } from './pages/consult-request/consult-request.component';
import { PricesComponent } from './pages/prices/prices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)
  },
  { path: 'projects', component: Projects, data: { pageName: 'Projects' } },
  { path: 'request', component: ConsultRequestComponent, data: { pageName: '' } },
  { path: 'prices', component: PricesComponent, data: { pageName: 'Pricing' } },
  { path: '**', redirectTo: 'home' }
];
