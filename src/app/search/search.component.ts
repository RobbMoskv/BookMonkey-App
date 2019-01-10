import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  // Target
  @Output() bookSelected = new EventEmitter<Book>();

  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  isLoading = false;

  constructor(private bs: BookStoreService) { }

  // The benefit by using switchMap() instead of mergeMap() / flatMap() is, that pending network requests are consolidated
  // in case new observables have been received.
  ngOnInit() {
    this.keyup
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(searchTerm => this.bs.getAllbySearch(searchTerm)),
        tap(() => this.isLoading = false),
      )
      .subscribe(books => this.foundBooks = books);
  }

}
