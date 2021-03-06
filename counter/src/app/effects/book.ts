import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, empty, of } from 'rxjs';
import { map,debounceTime,switchMap,takeUntil,skip,catchError } from 'rxjs/operators';

import { GoogleBooksService } from '@app/services/google-books';
import  * as actions from '@app/actions/book'

@Injectable()
export class BookEffects {

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(actions.SEARCH),
    debounceTime(300),
    switchMap(query => {
      const {payload} = query;
      if (payload === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(actions.SEARCH),
        skip(1)
      )
       
     return this.googleBooks.searchBooks(payload).pipe(
        takeUntil(nextSearch$),
        map(books => new actions.SearchCompleteAction(books)),
        catchError(error=>of(new actions.SearchCompleteAction(error)))
      )
    })
  );

    constructor(private actions$: Actions, private googleBooks: GoogleBooksService) { }
}
