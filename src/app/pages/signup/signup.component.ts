import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private authService:AuthService) { }

  async signup() {
    try {
      const result = await this.authService.signup(this.user);
      alert('Signup successful!');
      console.log(result);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    }
  }
}

