import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book, Thumbnail } from '../shared/book';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
  books: Book[];

  @Output() showDetailsEvent = new EventEmitter<Book>();
  constructor() {}
  // S. 94
  ngOnInit() {
    this.books = [
      new Book(
        '923842378',
        'Mathe mit James',
        ['James Brown', 'Harald Shore'],
        new Date(2018, 12, 19),
        'Grundlagen der Mathematik Vol 2',
        5,
        [
          new Thumbnail(
            'https://ng-buch.de/cover2.jpg',
            'Hilfe in der Mathematik'
          )
        ]
      ),
      new Book(
        '923842019',
        'Sprache leicht gelernt',
        ['Martina Meile', 'Kati Hering', 'Thomas Magular'],
        new Date(2014, 4, 2),
        'Lernen SIe auf einfach weise die Sprachen der Welt.',
        2,
        [
          new Thumbnail(
            'https://ng-buch.de/cover1.jpg',
            'Lernen kann auch Spass machen.'
          )
        ]
      )
    ];
  }

  // Method
  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }
}
