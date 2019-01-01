import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent {
  @Input() book: Book;
  @Output() showListEvent = new EventEmitter<any>();

  // Method
  getRating(num: number) {
    return new Array(num);
  }

  // Method
  showBookList() {
    this.showListEvent.emit();
  }
}
