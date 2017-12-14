import {Component, OnInit, OnChanges, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import {ArticleService} from '../article.service';
import {ArticleModel} from '../models/article.model';
import {Observable} from 'rxjs/Observable';

import {AuthenticationService} from '../../authentication/auth.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']

})
export class ListArticlesComponent implements OnInit, OnChanges {
  public model: ArticleModel;
  public articles: Object;
  public username: string;
  public userId: string;
  public isAdmin: boolean;
  public isAuthor: boolean;

  constructor(private articleService: ArticleService, private authService: AuthenticationService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(this.vcr)
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
    if (article['creator'] === username) {
      return true;
    } else {
      return false;
    }

  }

  isAdminCheck(userId) {
    return this.authService.isAdminRequest(userId)
      .subscribe(data => {
          this.isAdmin = !!data['_kmd']['roles'];
          console.log(this.isAdmin);
        },
        err => {
          console.log(err);
        });
  }


  ngOnInit() {
    this.list();
    this.isAdminCheck(this.userId);
  }

  ngOnChanges() {
    this.list();
    this.isAdminCheck(this.userId);
  }

  deleteArticle(id) {
    this.articleService.deleteArticle(id)
      .subscribe(data => {
        this.toastr.success('Article successfully deleted!');
          this.list();
        },
        err => {
          this.toastr.error(err.message);

        });
  }
}
