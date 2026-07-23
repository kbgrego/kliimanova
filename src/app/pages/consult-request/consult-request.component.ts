import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-consult-request',
  imports: [ReactiveFormsModule, RecaptchaModule, CommonModule],
  templateUrl: './consult-request.component.html',
  styleUrls: ['./consult-request.component.css']
})
export class ConsultRequestComponent {
  submitted = false;
  captchaToken: string | null = null;
  isSending = false;
  notificationSent = false;
  notificationError = false;
  requestForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly telegram: TelegramService
  ) {
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

  async submit(): Promise<void> {
    this.submitted = true;
    this.requestForm.markAllAsTouched();

    if (this.requestForm.invalid || this.isSending) return;

    this.isSending = true;
    this.notificationError = false;

    const { requestName, service, contactName, email, address } = this.requestForm.getRawValue();
    const message = [
      'New consultation request',
      `Request: ${requestName}`,
      `Service: ${service}`,
      `Contact: ${contactName}`,
      `Email: ${email}`,
      `Address: ${address}`
    ].join('\n');

    try {
      await this.telegram.sendNotification(message);
      this.notificationSent = true;
      this.requestForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error('Could not send consultation notification.', error);
      this.notificationError = true;
    } finally {
      this.isSending = false;
    }
  }

  cancel(): void {
    if (window.confirm('Cancel this request? All entered information will be erased.')) {
      this.requestForm.reset();
      this.captchaToken = null;
      this.submitted = false;
      this.notificationSent = false;
      this.notificationError = false;
    }
  }
}
