import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Models }  from '@app/reducers/models';

@Component({
  selector: 'app-book',
  template: `
    <label for="book_name">Enter book name</label>
    <input (keyup)="search($event.target.value)" type="text" class="form-control-plaintext" id="book_name">
  `,
  styleUrls: ['./book_home_cmp.scss']
})
export class BookComponent implements OnInit {
  
  constructor(private store: Store<Models>) { } 

  ngOnInit(): void {
  }

  search(query:string){
    debugger
    console.log(query);

  }

}
