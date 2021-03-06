import {NgModule} from '@angular/core';


// Modules
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import {ArticleService} from './article.service';
import { CommentsService } from './comment.service';
import {articleComponents} from './index';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {ListArticlesComponent} from './list-articles/list-articles.component';
import {ArticleDetailsComponent} from './article-details/article-details.component';
import {EditArticleComponent} from './edit-article/edit-article.form.component';
import {CreateArticleFormComponent} from './article-create/create-article.form.component';




@NgModule({
  declarations: [
    ...articleComponents
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: ListArticlesComponent, pathMatch: 'full'},
      {path: 'articles', component: ListArticlesComponent},
      {path: 'details/:id', component: ArticleDetailsComponent},
      {path: 'edit/:id', component: EditArticleComponent},
      {path: 'create', component: CreateArticleFormComponent},
    ])
  ],
  exports: [articleComponents],
  providers: [ArticleService, CommentsService]
})
export class ArticleModule {
}
