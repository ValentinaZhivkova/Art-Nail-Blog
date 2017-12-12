import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ArticleService} from '../article.service';

@Component({
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  public id: number;
  public article: Object;

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {

    this.id = this.route.snapshot.params['id'];

  }

  ngOnInit() {
    console.log(this.id);
    this.articleService.articleDetails(this.id)
      .subscribe(data => {
          console.log(this.id);
          this.article = data;
        },
        err => {
          console.log(err);
        });
  }
}
