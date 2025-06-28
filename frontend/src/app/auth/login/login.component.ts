import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule /* plus other imports like RouterModule if needed */],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = null;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error: any) => {
        this.errorMessage = error.error.errors[0] || 'Login failed';
      }
    });
  }
}
