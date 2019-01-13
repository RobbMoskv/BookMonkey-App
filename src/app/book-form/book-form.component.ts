import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {

  // Access variable of form reference
  @ViewChild('myForm') myForm: NgForm;
  // Initialize empty book object
  book = BookFactory.empty();
  // Import error message array
  errors: { [key: string]: string } = {};

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    // Catch form changes by subscribing to observable
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());

  }

  // Method: Access validation fields by iterating through formControl properties of error message list
  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.myForm.form.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  // Methode: Persist data of form by sumbmitting to book service.
  submitForm() {

    // transfer string data into array format
    this.book.authors = this.myForm.value.authors.split(',');
    this.book.thumbnails = [this.myForm.value.thumbnail];

    // transfer form object via book factory.
    const book = BookFactory.fromObject(this.book);

    // Persist book via service
    this.bs.create(book).subscribe(res => {
      this.book = BookFactory.empty();
      this.myForm.reset(BookFactory.empty());
    });
  }
}
