import { Action } from '@ngrx/store';
import { Book } from '@app/reducers/models';

//---------------------------------------------------Actions from LAYOUT 

export const OPEN_SIDENAV = '[Layout] Open Sidenav';
export const CLOSE_SIDENAV = '[Layout] Close Sidenav';

class OpenSidenavAction implements Action {
    readonly type = OPEN_SIDENAV;
}
class CloseSidenavAction implements Action {
    readonly type = CLOSE_SIDENAV;
}


//------------------------------------------------ Actions from BOOKS 

export const SEARCH = '[Book] Search';
export const SEARCH_COMPLETE = '[Book] Search Complete';
export const LOAD = '[Book] Load';
export const SELECT = '[Book] Select';

export class SearchCompleteAction implements Action {
    readonly type = SEARCH_COMPLETE;

    constructor(public payload: Book[]) { }
}

export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public payload: string) { }
}
class LoadBookAction implements Action {
    readonly type = LOAD;

    constructor(public payload: Book) { }
}
class SelectAction implements Action {
    readonly type = SELECT;

    constructor(public payload: string) { }
}


//-----------------------------------------------------------Actions from Collection


export const ADD_BOOK = '[Collection] Add Book';
export const LOAD_COLLECTION = '[Collection] Load';
export const REMOVE_BOOK = '[Collection] Remove Book';
export class AddBookSuccessAction implements Action {
    readonly type = ADD_BOOK_SUCCESS;

    constructor(public payload: Book) { }
}
export class AddBookFailAction implements Action {
    readonly type = ADD_BOOK_FAIL;

    constructor(public payload: Book) { }
}
export class LoadAction implements Action {
    readonly type = LOAD_COLLECTION;
}
export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: Book[]) { }
}
export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}
export class RemoveBookAction implements Action {
    readonly type = REMOVE_BOOK;

    constructor(public payload: Book) { }
}
export class RemoveBookSuccessAction implements Action {
    readonly type = REMOVE_BOOK_SUCCESS;

    constructor(public payload: Book) { }
}
export class RemoveBookFailAction implements Action {
    readonly type = REMOVE_BOOK_FAIL;

    constructor(public payload: Book) { }
}


export const ADD_BOOK_SUCCESS = '[Collection] Add Book Success';
export const ADD_BOOK_FAIL = '[Collection] Add Book Fail';

export const REMOVE_BOOK_SUCCESS = '[Collection] Remove Book Success';
export const REMOVE_BOOK_FAIL = '[Collection] Remove Book Fail';
export const LOAD_SUCCESS = '[Collection] Load Success';
export const LOAD_FAIL = '[Collection] Load Fail';

class AddBookAction implements Action {
    readonly type = ADD_BOOK;

    constructor(public payload: Book) { }
}


  
export type LayoutActions = OpenSidenavAction | CloseSidenavAction;
export type BookActions = SearchAction | SearchCompleteAction | LoadBookAction | SelectAction;
export type CollectionActions = AddBookAction | AddBookSuccessAction | AddBookFailAction | RemoveBookAction | RemoveBookSuccessAction | RemoveBookFailAction | LoadAction | LoadSuccessAction | LoadFailAction;


