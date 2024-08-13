import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5141/api/books';
  constructor(private router:Router) { }
  async getBooks(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      console.log(response.data);
      return response.data.books;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // add a new book
  async addBook(book: any, token: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding book",error);
      throw error;
    }
  }

  // update a book
  async editBook (bookId:string ,book: any, token: string): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${bookId}`, book, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      return response.data;
      
    } catch (error) {
        console.error("Error updating book",error);
        throw error;
    }
  }

  // delete a book
  async deleteBook(bookId: string, token: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
}
