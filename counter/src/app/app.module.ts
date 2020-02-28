import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { getEnvironmentReducer } from '@app/reducers/reducers';

import { DBModule } from '@ngrx/db';
import { schema } from './db';

import { BookEffects } from '@app/effects/book'
import { CollectionEffects } from '@app/effects/collection'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot(getEnvironmentReducer),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([BookEffects,CollectionEffects]),
    DBModule.provideDB(schema),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
