import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../shared/book';
import { BookFactory } from '../../shared/book-factory';
import { BookStoreService } from '../../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';
import { BookValidators } from '../shared/book.validators';


@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  book: Book = BookFactory.empty();
  errors: { [key: string]: string } = {}; // Import error message array

  isUpdatingBook = false;
  myForm: FormGroup;  // Initialze form model
  authors: FormArray;
  thumbnails: FormArray;

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    // Get book object from snapshot
    const data = this.route.snapshot.data;
    // Get pre loaded object in case it exists (modify book)
    if (data['book']) {
      this.isUpdatingBook = true;
      this.book = data['book'];
    }
    this.initBook();
  }

  // Method: Initialze form
  initBook() {
    this.buildAuthorsArray();
    this.buildThumbnailsArray();

    this.myForm = this.fb.group({
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn,
      [Validators.required,
      BookValidators.isbnFormat],
      this.isUpdatingBook ? null : BookValidators.isbnExists(this.bs)],
      description: this.book.description,
      authors: this.authors,
      thumbnails: this.thumbnails,
      published: this.book.published,
    });

    // Catch form changes by subscribing to observable
    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  // Method: Array builder for Authors
  buildAuthorsArray() {
    this.authors = this.fb.array(this.book.authors, BookValidators.atLeastOneAuthor);
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

  // Method: Adds an additional Author control to the view
  addAuthorControl() {
    this.authors.push(this.fb.control(null));
  }

  // Method: Adds an additional Thumbnail control to the view
  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: null, title: null }));
  }

  // Method: Access validation fields by iterating through formControl properties of error message list
  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.myForm.get(message.forControl);
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

    // filter empty values
    this.myForm.value.authors = this.myForm.value.authors.filter(author => author);
    this.myForm.value.thumbnails = this.myForm.value.thumbnails.filter(thumbnail => thumbnail.url);

    // transfer form object via book factory.
    const book: Book = BookFactory.fromObject(this.myForm.value);

    if (this.isUpdatingBook) {
      // Update book via service
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
      });
    } else {
      // Create new book via service
      this.bs.create(book).subscribe(res => {
        this.book = BookFactory.empty();
        this.myForm.reset(BookFactory.empty());
      });
    }
  }
}
