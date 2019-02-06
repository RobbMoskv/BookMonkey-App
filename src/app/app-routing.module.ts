import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';

// Components
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    // Lazy loading routes
    {
        path: 'books',
        loadChildren: './book/book.module#BookModule'
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [CanNavigateToAdminGuard] // Guarded
    }
];

@NgModule({
    // Call forRoot() method on the RouterModule and pass the array with the route definition
    // Also pass the preloading strategy
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule { }
