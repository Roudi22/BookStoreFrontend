import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  bookId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private bookService: BookService
  ) {
    this.editBookForm = this.fb.group({
      id: [''],
      title: [''],
      author: [''],
      isbn: ['']
    });
    this.bookId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getBookDetails();
  }

  // Fetch the book details based on the ID
  async getBookDetails() {
    try {
      const response = await axios.get(`http://localhost:5141/api/books/${this.bookId}`);
      const book = response.data.book;
      console.log(book);
      this.editBookForm.patchValue({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn
      });
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  }

  // Submit the updated book details
  async onSubmit() {
    try {
      const token = localStorage.getItem('token');
      console.log(this.editBookForm.value);
      await this.bookService.editBook(this.bookId, this.editBookForm.value, token!);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error updating book:', error);
      
    }
  }
}
