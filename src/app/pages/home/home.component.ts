import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenSquare, faFileWord, faAt, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  // Declare the 'faCoffee' variable
  faTrash = faTrash;
  faPenSquare = faPenSquare;
  faHeading = faFileWord;
  faAuthor = faAt;
  faIsbn = faCircleInfo;
  
  constructor(private router: Router, private authService:AuthService, private bookService:BookService) { }

  ngOnInit(): void {
    // Fetch books from API when the component initializes
    this.loadBooks();
  }
  async loadBooks() {
    try {
      this.books = await this.bookService.getBooks();
      console.log(this.books);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }
  async deleteBook(bookId: string) {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    try {
      const res = await this.bookService.deleteBook(bookId, token!);
      this.loadBooks(); // Refresh the list after deletion
      console.log(res);
      alert(res.message);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  }}
