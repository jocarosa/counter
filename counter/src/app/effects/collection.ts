import { Injectable } from '@angular/core';
//import { Action } from '@ngrx/store';
import { Effect, Actions, ofType,createEffect } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable,of,defer } from 'rxjs';
import { startWith,switchMap,toArray,map, catchError,mergeMap } from 'rxjs/operators';

import {
  LOAD_COLLECTION,
  REMOVE_BOOK,
  LoadAction,
  LoadSuccessAction,
  LoadFailAction,
  ADD_BOOK,
  AddBookSuccessAction,
  AddBookFailAction,
  RemoveBookAction,
  RemoveBookSuccessAction,
  RemoveBookFailAction
}  from '@app/reducers/actions';

import { Book } from '@app/reducers/models';


@Injectable()
export class CollectionEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  loadCollection$ = createEffect(()=>
    this.actions$.pipe(
      ofType(LOAD_COLLECTION),
      startWith(new LoadAction()),
      switchMap(() => {
        return this.db.query('books').pipe(
          toArray(),
          map((books: Book[]) => new LoadSuccessAction(books)),
          catchError(error => of(new LoadFailAction(error)))
        )
      }
      ))
  );
    
 
   @Effect()
   addBookToCollection$ = createEffect(()=>this.actions$.pipe(
    ofType(ADD_BOOK),
     mergeMap(book =>
      this.db.insert('books', [ book ]).pipe(
        map(()=>new AddBookSuccessAction(book)),
        catchError(error=>of(new AddBookFailAction(error)))
      )
    )
   )
   );
   


  @Effect()
  removeBookFromCollection$ = createEffect(()=>this.actions$.pipe(
    ofType(REMOVE_BOOK),
    map((action: RemoveBookAction) => action.payload),
    mergeMap(book => this.db.executeWrite('books', 'delete', [book.id]).pipe(
      map(() => new RemoveBookSuccessAction(book)),
      catchError(() => of(new RemoveBookFailAction(book)))
    )
    )
  )
  );

  

    constructor(private actions$: Actions, private db: Database) { }
}
