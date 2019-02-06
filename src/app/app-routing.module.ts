import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // Lazy loading routes
    { path: 'books', loadChildren: 'app/book/book.module#BookModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
];

@NgModule({
    // Call forRoot() method on the RouterModule and pass the array with the route definition
    // Also pass the preloading strategy
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
