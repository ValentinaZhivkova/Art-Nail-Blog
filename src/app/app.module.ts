import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationModule } from './authentication/auth.module';
import {ArticleModule} from './components/article-comments.module';
import { AppRoutesModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard.service';
import { AdminGuard } from './guards/admin.guard.service';


import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
