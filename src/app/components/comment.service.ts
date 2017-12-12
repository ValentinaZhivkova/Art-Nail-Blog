import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {CommentModel} from './models/comment.model';


const appKey = 'kid_HJ1c0Hd-f';
const appSecret = '7dd7a63d7b9f46b89e0bc22dea719afd';


const commentsUrl = `https://baas.kinvey.com/appdata/${appKey}/comments`;


@Injectable()
export class CommentsService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {

  }

  getComments(articleId) {
    return this.http.get(commentsUrl + `?query={"articleId":"${articleId}"}`,
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  postComment(comment) {
    return this.http.post(commentsUrl, JSON.stringify(comment),
      {
        headers: this.createAuthHeaders('Kinvey')
      });
  }

  deleteComment(id) {
    return this.http.delete(commentsUrl + '/' + id, {
      headers: this.createAuthHeaders('Kinvey')
    });
  }

  isLoggedIn() {
    const authtoken: string = localStorage.getItem('authtoken');

    return this.currentAuthtoken = authtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      });
    }
  }
}
