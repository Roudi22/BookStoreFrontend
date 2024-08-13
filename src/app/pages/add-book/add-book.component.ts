import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  book = {
    title: '',
    author: '',
    isbn: '',
  };

  constructor(private bookService: BookService, private router: Router) { }

  async addBook() {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    try {
      await this.bookService.addBook(this.book, token!);
      this.router.navigate(['/home']); // Navigate back to the home page after adding the book
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }
}
