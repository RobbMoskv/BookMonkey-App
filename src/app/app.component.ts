import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book;

  // Method
  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  // Method
  showDetails(book: Book) {
    this.book = book;
    this.detailsOn = true;
    this.listOn = false;
  }
}
