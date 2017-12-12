import {Component, OnInit, Input} from '@angular/core';
import {CommentsService} from '../comment.service';
import {CommentModel} from '../models/comment.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './list-comments.component.html'
})
export class CommentComponent implements OnInit {
  @Input() articleId;
  public model: CommentModel = {
    articleId: '',
    content: '',
    author: localStorage.getItem('username'),
    date: new Date()
  };
  comments;

  constructor(private commentsService: CommentsService, private route: ActivatedRoute) {
    this.articleId = route.snapshot.params['id'];
  }

  ngOnInit() {

  }

  loadComments() {
    this.commentsService.getComments(this.articleId)
      .subscribe(data => {
        this.comments = data;
        console.log(this.comments);
      },
        err => {
          console.log(err);
        });
  }

  postComment() {
    this.model.articleId = this.articleId;
    this.commentsService.postComment(this.model)
      .subscribe(data => {
        // TODO: notify successful comment create
        this.loadComments();
      },
        err => {
          console.log(err);
        });
  }

  deleteComment(id) {
    this.commentsService.deleteComment(id)
      .subscribe(data => {
        // TODO: notify successful comment delete
        this.loadComments();
      });
  }
}
