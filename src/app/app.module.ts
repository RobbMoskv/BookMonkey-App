import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService } from './shared/book-store.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BookFormComponent } from './book-form/book-form.component';

import { registerLocaleData } from '@angular/common';
import localeCH from '@angular/common/locales/de-CH';
import { IsbnPipe } from './shared/isbn.pipe';
import { ZoomDirective } from './shared/zoom.directive';

// the second parameter 'ch' is optional
registerLocaleData(localeCH, 'ch');

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    IsbnPipe,
    ZoomDirective
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DateValueAccessorModule
  ],
  providers: [BookStoreService, { provide: LOCALE_ID, useValue: 'ch' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
