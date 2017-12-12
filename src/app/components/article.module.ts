import {NgModule} from '@angular/core';


// Modules
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

// Services
import {ArticleService} from './article.service';
import {articleComponents} from './index';
import { FormsModule } from '@angular/forms';
import {ArticleModel} from './models/article.model';



@NgModule({
  declarations: [
    ...articleComponents
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [articleComponents],
  providers: [ArticleService]
})
export class ArticleModule {
}
