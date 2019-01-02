import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AppComponent } from './app.component';


const routes: Routes = [
    { path: '', component: BookListComponent, pathMatch: 'full' },
    { path: 'booklist', component: BookListComponent },
    { path: 'bookdetails/:id', component: BookDetailsComponent }
];

@NgModule({
    // Call forRoot() method on the RouterModule and pass the array with the route definition
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
