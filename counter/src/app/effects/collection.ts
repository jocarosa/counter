import { Injectable } from '@angular/core';
//import { Action } from '@ngrx/store';
import { Effect, Actions, ofType,createEffect } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable,of,defer } from 'rxjs';
import { startWith,switchMap,toArray,map, catchError,mergeMap } from 'rxjs/operators';

import * as fromRootCollection  from '@app/actions/collection';

import { Book } from '@app/models/book';


@Injectable()
export class CollectionEffects {

  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });

  @Effect()
  loadCollection$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fromRootCollection.LOAD),
      startWith(new fromRootCollection.LoadAction()),
      switchMap(() => {
        return this.db.query('books').pipe(
          toArray(),
          map((books: Book[]) => new fromRootCollection.LoadSuccessAction(books)),
          catchError(error => of(new fromRootCollection.LoadFailAction(error)))
        )
      }
      ))
  );
    
 
   @Effect()
   addBookToCollection$ = createEffect(()=>this.actions$.pipe(
    ofType(fromRootCollection.ADD_BOOK),
     mergeMap(book =>
      this.db.insert('books', [ book ]).pipe(
        map(()=>new fromRootCollection.AddBookSuccessAction(book)),
        catchError(error=>of(new fromRootCollection.AddBookFailAction(error)))
      )
    )
   )
   );
   


  @Effect()
  removeBookFromCollection$ = createEffect(()=>this.actions$.pipe(
    ofType(fromRootCollection.REMOVE_BOOK),
    map((action: fromRootCollection.RemoveBookAction) => action.payload),
    mergeMap(book => this.db.executeWrite('books', 'delete', [book.id]).pipe(
      map(() => new fromRootCollection.RemoveBookSuccessAction(book)),
      catchError(() => of(new fromRootCollection.RemoveBookFailAction(book)))
    )
    )
  )
  );

  

    constructor(private actions$: Actions, private db: Database) { }
}
