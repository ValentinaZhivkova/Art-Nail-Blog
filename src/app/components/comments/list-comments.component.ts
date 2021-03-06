import {Component, OnInit, Input, OnChanges, ViewContainerRef} from '@angular/core';
import {CommentsService} from '../comment.service';
import {CommentModel} from '../models/comment.model';
import {ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../../authentication/auth.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-comment',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() articleId;
  public model: CommentModel;
  isAdmin: boolean;
  comments;

  constructor(private commentsService: CommentsService, private route: ActivatedRoute, private authService: AuthenticationService,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    // this.articleId = route.snapshot.params['id'];
    this.model = new CommentModel(
      this.articleId,
      '',
      localStorage.getItem('username'),
      new Date()
    );
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.isAdminCheck(localStorage.getItem('userId'));
     this.loadComments();
  }

  loadComments() {
    this.commentsService.getComments(this.articleId)
      .subscribe(data => {
          this.comments = data;


        },
        err => {
          console.log(err);
        });
  }

  postComment() {
    this.model.articleId = this.articleId;
    this.commentsService.postComment(this.model)
      .subscribe(data => {
          this.toastr.success('Comment added!')
          this.loadComments();
        },
        err => {
          this.toastr.error(err.message);
        });
  }

  deleteComment(id) {
    this.commentsService.deleteComment(id)
      .subscribe(data => {
        this.toastr.info('Comment deleted!')
        this.loadComments();
      });
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
}
