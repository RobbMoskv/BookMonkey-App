import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  bookSelected(book: Book) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['../books', book.isbn], { relativeTo: this.route });
  }

}
