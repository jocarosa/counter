import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State }  from '@app/reducers/';

import { Observable } from 'rxjs/Observable';
import { Book } from '@app/models/book';
import * as selectors from '@app/reducers/index'
import * as actions from '@app/actions/book'
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-book',
  template: `
    <label for="book_name">Enter book name</label>
    <input (keyup)="search($event.target.value)" type="text" class="form-control-plaintext" id="book_name">

    `,
  styleUrls: ['./book_home_cmp.scss']
})
export class BookComponent implements OnInit {

  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<State>) { 
    this.searchQuery$ = store.select(selectors.getSearchQuery).pipe(take(1))
    this.books$ = store.select(selectors.getSearchResults);
    this.loading$ = store.select(selectors.getSearchLoading);
  } 

  ngOnInit(): void {
  }

  search(query:string){
    
    this.store.dispatch(new actions.SearchAction(query));
    console.log(this.books$.subscribe(s=>{console.log(s)}));
    // this.books$.subscribe(s=>{
    //   console.log(s);
    // });
  }

}
