import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-quote',
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './add-quote.component.html',
    styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;
  quotes: any[] = [];  // Variable to hold the list of quotes

  constructor(private fb: FormBuilder, private router: Router) {
      this.quoteForm = this.fb.group({
          text: ['', Validators.required]
      });
  }

  ngOnInit(): void {
      this.fetchQuotes();  // Fetch the quotes when the component initializes
  }

  fetchQuotes(): void {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Make the GET request to fetch the quotes
      axios.get('http://localhost:5141/api/quote', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => {
          this.quotes = response.data;  // Assign the fetched quotes to the quotes array
      })
      .catch(error => {
          console.error('There was an error fetching the quotes!', error);
      });
  }

  onSubmit(): void {
      if (this.quoteForm.valid) {
          const quote = this.quoteForm.value;

          // Get the token from localStorage
          const token = localStorage.getItem('token');

          // Make the POST request to add the quote
          axios.post('http://localhost:5141/api/quote', quote, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          .then(response => {
              alert('Quote added successfully!');
              this.fetchQuotes();  // Refresh the list of quotes after adding a new one
              this.quoteForm.reset();  // Reset the form after submission
          })
          .catch(error => {
              console.error('There was an error adding the quote!', error);
              alert('Failed to add the quote. Please try again.');
          });
      }
  }
}