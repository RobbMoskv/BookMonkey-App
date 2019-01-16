import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';


@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {

  myForm: FormGroup;  // Initialte form model
  authors: FormArray;
  thumbnails: FormArray;
  book: Book = BookFactory.empty();
  errors: { [key: string]: string } = {}; // Import error message array
  isUpdatingBook = false;

  constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    // Get book based on selected isbn if exisits and initialize form
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }

    this.initBook();

  }

  // Method: Initialze form
  initBook() {
    this.buildAuthorsArray();
    this.buildThumbnailsArray();

    this.myForm = this.fb.group({
      title: [this.book.title, Validators.required],
      subtitle: [this.book.subtitle],
      isbn: [this.book.isbn, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      description: [this.book.description],
      authors: [this.authors],
      thumbnails: [this.thumbnails],
      published: [this.book.published],
    });

    // Catch form changes by subscribing to observable
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  // Method: Array builder for Authors
  buildAuthorsArray() {
    this.authors = this.fb.array(this.book.authors, Validators.required);
  }

  // Method: Array builder for thumbnails
  buildThumbnailsArray() {
    this.thumbnails = this.fb.array(
      this.book.thumbnails.map(
        t => this.fb.group({
          url: this.fb.control(t.url),
          title: this.fb.control(t.title),
        })
      )
    );
  }

  // Method:
  // S.239

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
