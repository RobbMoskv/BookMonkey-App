import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.book = this.bs.getSingle(params['isbn']);
  }

  // Method
  getRating(num: number) {
    return new Array(num);
  }
}
