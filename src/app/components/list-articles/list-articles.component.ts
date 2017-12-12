import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article.service';
import {ArticleModel} from '../models/article.model';
import {Observable} from 'rxjs/Observable';

import {AuthenticationService} from '../../authentication/auth.service';

@Component({
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']

})
export class ListArticlesComponent implements OnInit {
  public model: ArticleModel;
  public articles: Object;
  public username: string;
  public userId: string;
  public isInRole: boolean;
  public isAuthor: boolean;

  constructor(private articleService: ArticleService, private authService: AuthenticationService) {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');
  }

  list() {
    this.articleService.listArticles()
      .subscribe(
        data => {
          console.log(data);
          this.articles = data;
          console.log(this.isAuthor);
          console.log('model' + this.articles);


        },
        err => {
          console.log(err);
        });
  }

  isAuthorCheck(username, article) {
    console.log(username + '->' + article['creator']);
    if (article['creator'] === username) {
      return true;
    } else {
      return false;
    }

  }

  isAdminCheck(userId) {
    return this.authService.isAdminRequest(userId)
      .subscribe(data => {
          this.isInRole = !!data['_kmd']['roles'];
          console.log(this.isInRole);
        },
        err => {
          console.log(err);
        });
  }


  ngOnInit() {
    this.list();
    this.isAdminCheck(this.userId);
  }
}
