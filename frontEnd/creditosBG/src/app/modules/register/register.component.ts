import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
userName = '';
  password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
  this.authService.register(this.userName, this.password).subscribe({
    next: (res) => {
      console.log('Respuesta backend:', res);
      this.successMessage = 'Registro exitoso. Puedes iniciar sesión.';
      this.errorMessage = '';
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.log('Error backend:', err);
      if (typeof err.error === 'string') {
        this.errorMessage = err.error;
      } else if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Error desconocido al registrar';
      }
      this.successMessage = '';
    }
  });
}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
