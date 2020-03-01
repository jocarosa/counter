import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { reducer } from '@app/reducers';

import { DBModule } from '@ngrx/db';
import { schema } from './db';

import { BookEffects } from '@app/effects/book'
import { CollectionEffects } from '@app/effects/collection'

import {GoogleBooksService} from '@app/services/google-books'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    
    StoreModule.forRoot(reducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([BookEffects,CollectionEffects]),
    DBModule.provideDB(schema)  
  ],
  providers: [GoogleBooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
