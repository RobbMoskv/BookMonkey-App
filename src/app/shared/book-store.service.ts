import { Injectable } from '@angular/core';
import { Book, Thumbnail } from './book';

@Injectable()
export class BookStoreService {

  books: Book[];

  constructor() {
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

  getAll() {
    return this.books;
  }
}
