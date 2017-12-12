import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationModule } from './authentication/auth.module';
import {ArticleModule} from './components/article.module';
import { AppRoutesModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard.service';


import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive.form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    ArticleModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
