import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookFactory } from '../../shared/book-factory';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book: Book = BookFactory.empty();

  constructor(private route: ActivatedRoute, private router: Router, private bs: BookStoreService) { }

  ngOnInit() {
    // Request data via Resolver instead of Service
    this.book = this.route.snapshot.data['book'];
  }

  // Method:
  getRating(num: number) {
    return new Array(num);
  }

  // Method: Removes a book
  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bs.remove(this.book.isbn).subscribe(res => this.router.navigate(['../'], {
        relativeTo: this.route
      }));
    }
  }
}
