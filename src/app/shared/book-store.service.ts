import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { BookFactory } from './book-factory';

@Injectable()
export class BookStoreService {

  private api = 'https://book-monkey2-api.angular-buch.com';
  private headers: Headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-type', 'application/json');
  }
  // Method: Get all books
  // Der map()-Operator dient zur Transformation eines Werts in ein anderes Format.
  getAll(): Observable<Book[]> {
    return this.http.get(`${this.api}/books`)
      .pipe(
        retry(3),
        map(response => response.json()),
        map(rawBooks => rawBooks.map(rawBook => BookFactory.fromObject(rawBook))),
        catchError(this.errorHandler));
  }

  // Method: Get all books by search
  getAllbySearch(searchTerm: string): Observable<Book[]> {
    return this.http.get(`${this.api}/books/search/${searchTerm}`)
      .pipe(
        retry(3),
        map(response => response.json()),
        map(rawBooks => rawBooks.map(rawBook => BookFactory.fromObject(rawBook))),
        catchError(this.errorHandler));
  }

  // Method: Get a single book
  getSingle(isbn: string): Observable<Book> {
    return this.http.get(`${this.api}/book/${isbn}`)
      .pipe(
        retry(3),
        map(response => response.json()),
        map(rawBook => BookFactory.fromObject(rawBook)),
        catchError(this.errorHandler)
      );
  }

  // Method: Create a new Book
  create(book: Book): Observable<any> {
    return this.http.post(`${this.api}/book`, JSON.stringify(book), { headers: this.headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Method: Update an existing Book
  update(book: Book): Observable<any> {
    return this.http.put(`${this.api}/book/${book.isbn}`, JSON.stringify(book), { headers: this.headers })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Method: Update an existing Book
  remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Method: Handels error messages
  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }

  // Method: Check if provided ISBN already exists
  check(isbn: string): Observable<Boolean> {
    return this.http
      .get(`${this.api}/book/${isbn}/check`)
      .pipe(
        map(res => res.json()),
        catchError(this.errorHandler),
      );
  }
}

