import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLogin {

  private readonly authService = inject(AuthService);

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

}
