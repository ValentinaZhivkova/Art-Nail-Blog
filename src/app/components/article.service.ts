import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {ArticleModel} from './models/article.model';


const appKey = 'kid_HJ1c0Hd-f';
const appSecret = '7dd7a63d7b9f46b89e0bc22dea719afd';


const listArticlesUrl = `https://baas.kinvey.com/appdata/${appKey}/articles`;
const postArticlesUrl = `https://baas.kinvey.com/appdata/${appKey}/articles`;
const articleDetailsUrl = `https://baas.kinvey.com/appdata/${appKey}/articles`;


@Injectable()
export class ArticleService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {

  }

  listArticles() {
    return this.http.get(
      listArticlesUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    );
  }

  articleDetails(id) {
    return this.http.get(
      listArticlesUrl + '/' + id,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    );
  }

  createArticle(artcleModel: ArticleModel): Observable<Object> {
    return this.http.post(
      postArticlesUrl,
      JSON.stringify(artcleModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    );

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
