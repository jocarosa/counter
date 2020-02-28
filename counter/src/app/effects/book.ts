import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, empty, of } from 'rxjs';
import { map,debounceTime,switchMap,takeUntil,skip,catchError } from 'rxjs/operators';

import { GoogleBooksService } from '@app/services/google-books';
import { SEARCH,SearchCompleteAction } from '@app/reducers/actions'

@Injectable()
export class BookEffects {

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType(SEARCH),
    debounceTime(300),
    switchMap(query => {
      if (query === '') {
        return empty();
      }

      const nextSearch$ = this.actions$.pipe(
        ofType(SEARCH),
        skip(1)
      )

     return this.googleBooks.searchBooks(query).pipe(
        takeUntil(nextSearch$),
        map(books => new SearchCompleteAction(books)),
        catchError(error=>of(new SearchCompleteAction(error)))
      )
    })
  );

    constructor(private actions$: Actions, private googleBooks: GoogleBooksService) { }
}
