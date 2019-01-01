import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  template: `
    <bm-book-list
      *ngIf="listOn"
      (showDetailsEvent)="showDetails($event)"
    ></bm-book-list>

    <bm-book-details
      *ngIf="detailsOn"
      (showListEvent)="showList()"
      [book]="book"
    ></bm-book-details>
  `,
  styles: []
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book;
  // Seite 110

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
