import {NgModule} from '@angular/core';


// Modules
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

// Services
import {ArticleService} from './article.service';
import { CommentsService } from './comment.service';
import {articleComponents} from './index';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ...articleComponents
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [articleComponents],
  providers: [ArticleService, CommentsService]
})
export class ArticleModule {
}
