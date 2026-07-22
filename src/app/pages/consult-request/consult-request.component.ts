import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha-2';

@Component({
  selector: 'app-consult-request',
  imports: [ReactiveFormsModule, RecaptchaModule, CommonModule],
  templateUrl: './consult-request.component.html',
  styleUrls: ['./consult-request.component.css']
})
export class ConsultRequestComponent {
  submitted = false;
  captchaToken: string | null = null;
  requestForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      requestName: ['', Validators.required],
      service: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  isInvalid(name: string): boolean {
    const field = this.requestForm.get(name);
    return !!field && field.invalid && (field.touched || this.submitted);
  }

  onCaptchaResolved(token: string | null): void {
    this.captchaToken = token;
  }

  submit(): void {
    this.submitted = true;
    this.requestForm.markAllAsTouched();

    if (this.requestForm.invalid || !this.captchaToken) return;

    // Submit data here
  }

  cancel(): void {
    if (window.confirm('Cancel this request? All entered information will be erased.')) {
      this.requestForm.reset();
      this.captchaToken = null;
      this.submitted = false;
    }
  }
}
