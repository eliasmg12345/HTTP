import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//A2 importando
import {HttpClientModule} from '@angular/common/http';
//E1
import {ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //A2
    HttpClientModule,
    //E1
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
/* */