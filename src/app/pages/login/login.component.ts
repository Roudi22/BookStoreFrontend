import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private authService: AuthService) { }

  async login() {
    try {
      const result = await this.authService.login(this.user);
      this.authService.saveToken(result.token); // Save token to localStorage
      alert('Login successful!');
      this.router.navigate(['/home']); // Redirect to the home page
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  }
}
