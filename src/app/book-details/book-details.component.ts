import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  id: number;
  @Input() book: Book;
  // @Output() showListEvent = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  // Method
  getRating(num: number) {
    return new Array(num);
  }
}
