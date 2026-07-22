import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultRequestComponent } from './consult-request.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ConsultRequestComponent, ReactiveFormsModule]
})
export class ConsultRequestModule {}
