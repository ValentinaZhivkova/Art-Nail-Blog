import {Component} from '@angular/core';
import {ArticleModel} from '../models/article.model';
import { Router } from '@angular/router';

import { ArticleService } from '../article.service';

@Component({
  templateUrl: './create-article.form.component.html'
})

export class CreateArticleFormComponent {

  public categories: string[];
  public model: ArticleModel;
  public creator = localStorage.getItem('username');
  public currentDate = new Date(Date.now()).toDateString();
  public submitted: boolean;

  constructor(private articleService: ArticleService, private router: Router) {
    this.categories = ['Nail Art', 'Manicure', 'Nail Forms'];
    this.model = new ArticleModel(
      '',
      '',
      this.creator,
      '',
      '',
      '',
      this.currentDate);
    this.submitted = false;

  }

  onSubmit() {
    this.articleService.createArticle(this.model)
      .subscribe(
        data => {
          this.router.navigate(['']);

        },
        err => {
          console.log(err);
        });
    this.submitted = true;

  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

}
