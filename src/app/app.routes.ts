import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)
  },
  {
    path: 'projects',
    component: Projects
  },
  { path: '**', redirectTo: 'home' }
];
