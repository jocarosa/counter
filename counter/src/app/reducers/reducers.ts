import { Models }  from '@app/reducers/models';

import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { ActionReducer } from '@ngrx/store';
import  * as todoAction  from '@app/reducers/actions';
import * as fromRouter from '@ngrx/router-store';
import { Book } from '@app/reducers/models';



    //productionReducer: ActionReducer<Models> = combineReducers(this.getReducers());
    
    export function getEnvironmentReducer(){
        return developmentReducer;
    }
 
    
    const searchInitialState: Models["search"] ={
        ids:[],
        loading:false,
        query:''
    }
    const bookInitialState: Models["books"] = {
        ids: [],
        entities: {},
        selectedBookId: null,
    }    
    const  collectionInitialState: Models["collection"] = {
        loaded: false,
        loading: false,
        ids: []
    }
    const  layoutInitialState: Models["layout"] = {
        showSidenav: false
    }
 

    const searchRedu = function getSearchReducer(
      state:Models["search"] =searchInitialState , 
      action:todoAction.BookActions ): Models["search"] {
        switch (action.type) {
          case todoAction.SEARCH: {
            const query = action.payload;
      
            if (query === '') {
              return {
                ids: [],
                loading: false,
                query
              };
            }
      
            return Object.assign({}, state, {
              query,
              loading: true
            });
          }
      
          case todoAction.SEARCH_COMPLETE: {
            const books = action.payload;
      
            return {
              ids: books.map(book => book.id),
              loading: false,
              query: state.query
            };
          }
      
          default: {
            return state;
          }
        }
    }
    const booksRedu = function getBooksReducer( 
      state:Models["books"] =bookInitialState , 
      action:todoAction.BookActions | todoAction.CollectionActions ): Models["books"] {
        switch (action.type) {
          case todoAction.SEARCH_COMPLETE:
          case todoAction.LOAD_SUCCESS: {
            const books = action.payload;
            const newBooks = books.filter(book => !state.entities[book.id]);
      
            const newBookIds = newBooks.map(book => book.id);
            const newBookEntities = newBooks.reduce((entities: { [id: string]: Book }, book: Book) => {
              return Object.assign(entities, {
                [book.id]: book
              });
            }, {});
      
            return {
              ids: [ ...state.ids, ...newBookIds ],
              entities: Object.assign({}, state.entities, newBookEntities),
              selectedBookId: state.selectedBookId
            };
          }
      
          case todoAction.LOAD: {
            const book = action.payload;
      
            if (state.ids.indexOf(book.id) > -1) {
              return state;
            }
      
            return {
              ids: [ ...state.ids, book.id ],
              entities: Object.assign({}, state.entities, {
                [book.id]: book
              }),
              selectedBookId: state.selectedBookId
            };
          }
      
          case todoAction.SELECT: {
            return {
              ids: state.ids,
              entities: state.entities,
              selectedBookId: action.payload
            };
          }
      
          default: {
            return state;
          }
        }
    }
    const collectionRedu = function getCollectionReducer(
      state:Models["collection"]=collectionInitialState , action:todoAction.CollectionActions): Models["collection"] {
        switch (action.type) {
            case todoAction.LOAD_COLLECTION: {
                return Object.assign({}, state, {
                    loading: true
                });
            }
            case todoAction.LOAD_SUCCESS: {
                const books = action.payload;

                return {
                    loaded: true,
                    loading: false,
                    ids: books.map(book => book.id)
                };
            }
            case todoAction.ADD_BOOK_SUCCESS:
            case todoAction.REMOVE_BOOK_FAIL: {
                const book = action.payload;

                if (state.ids.indexOf(book.id) > -1) {
                    return state;
                }

                return Object.assign({}, state, {
                    ids: [...state.ids, book.id]
                });
            }
            case todoAction.REMOVE_BOOK_SUCCESS:
            case todoAction.ADD_BOOK_FAIL: {
                const book = action.payload;

                return Object.assign({}, state, {
                    ids: state.ids.filter(id => id !== book.id)
                });
            }
            default: {
                return state;
            }
        }
    }      
    const layoutRedu = function getLayoutReducer(
      state:Models["layout"]=layoutInitialState ,
       action:todoAction.LayoutActions ): Models["layout"] {
        switch (action.type) {
            case todoAction.CLOSE_SIDENAV:
                return {
                    showSidenav: false
                };

            case todoAction.OPEN_SIDENAV:
                return {
                    showSidenav: true
                };

            default:
                return state;
        }
    }
     
    const  reducers = {
      search: searchRedu,
      books: booksRedu,
      collection: collectionRedu,
      layout:layoutRedu,
      router: fromRouter.routerReducer
    }
    
    const developmentReducer : 
    ActionReducer<Models> = compose(storeFreeze, combineReducers)(reducers);
    
  