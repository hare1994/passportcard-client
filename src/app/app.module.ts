import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {BoxesComponent} from "./components/boxes.component";
import {StatesService} from "./services/states.service";

@NgModule({
  declarations: [AppComponent, BoxesComponent],
  imports: [BrowserModule,  HttpClientModule],
  providers: [StatesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
