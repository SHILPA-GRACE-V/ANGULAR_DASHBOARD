import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: res => {
        if (res.success) {
          sessionStorage.setItem('username', this.username);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials.');
        }
      },
      error: err => {
        console.error(err);
        alert('Login error!');
      }
    });
  }
}
