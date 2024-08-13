import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5141/api/auth'; // Replace with your API base URL

  constructor(private router:Router) { }

  // Signup method
  async signup(user: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, user);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }

  // Login method
  async login(user: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, user);
      console.log(response.data);
      return response.data; // This should include the token
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
// Check if user is logged in
isLoggedIn(): boolean {
  return !!this.getToken(); // Returns true if a token exists
}
logout(): void {
  this.clearToken();
  this.router.navigate(['/login']); // Redirect to the login page
}
  // Clear token from localStorage
  clearToken(): void {
    localStorage.removeItem('token');
  }
}
