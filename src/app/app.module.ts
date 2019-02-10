import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

import { BookStoreService } from './shared/book-store.service';
import { registerLocaleData } from '@angular/common';
import localeCH from '@angular/common/locales/de-CH';
import { BookResolver } from './shared/book-resolver.service';

// the second parameter 'ch' is optional
registerLocaleData(localeCH, 'ch');

// Attach meta data to class
@NgModule({
  // declared components to be valid within this module
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
  ],
  // import neccessary modules to be valid within this module
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
  ],
  // Injectable modules available across the whole app
  providers: [BookStoreService, BookResolver, { provide: LOCALE_ID, useValue: 'ch' }],
  // Define which component to load on bootstrapping
  bootstrap: [AppComponent]
})
export class AppModule { }
