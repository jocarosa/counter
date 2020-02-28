import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from '@book/book_home_cmp';

const routes: Routes = [
    {
        path: '', component: BookComponent,
    }
];

@NgModule({
    declarations: [
        BookComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule
    ],
    exports: [RouterModule],
    bootstrap: [BookComponent],
    providers: []
})
export class BookModule { }