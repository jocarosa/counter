
import * as fromRouter from '@ngrx/router-store';

export interface Models {
    search: StateModel;
    books: BooksModel;
    collection: CollectionModel;
    layout: LayoutModel;
    router: fromRouter.RouterState;
}

interface BooksModel{
    ids: string[];
    entities: { [id: string]: Book };
    selectedBookId: string | null;
}

interface StateModel {
    ids: string[];
    loading: boolean;
    query: string;
};

interface CollectionModel {
    loaded: boolean;
    loading: boolean;
    ids: string[]
};

interface LayoutModel {
    showSidenav: boolean;
}
  

export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishDate: string;
      description: string;
      averageRating: number;
      ratingsCount: number;
      imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
      };
    };
  }