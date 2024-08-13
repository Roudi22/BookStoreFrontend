import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faPlus, faRightToBracket,faSquareXmark, faNotesMedical, faUserPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Declare the 'faHouse' variable
  faHouse = faHouse;
  // Declare the 'faPlus' variable
  faPlus = faPlus;
  // Declare the 'faRightToBracket' variable
  faRightToBracket = faRightToBracket
  // Declare the 'faSquareXmark' variable
  faSquareXmark = faSquareXmark;
  faNotesMedical = faNotesMedical;
  faUserPlus = faUserPlus;
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
