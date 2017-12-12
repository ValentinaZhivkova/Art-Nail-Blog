import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthenticationModule } from './authentication/auth.module';
import {ArticleModule} from './components/article-comments.module';
import { AppRoutesModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard.service';


import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ArticleModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
