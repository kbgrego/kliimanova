import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';

const routes: Routes = [{ path: '', component: MaintenanceComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaintenanceComponent]
})
export class MaintenanceModule {}
