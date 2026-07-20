import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'maintenance', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)
  },
  { path: '**', redirectTo: 'maintenance' }
];
