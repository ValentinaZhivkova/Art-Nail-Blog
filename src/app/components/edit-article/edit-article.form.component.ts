import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../article.service';
import {Router} from '@angular/router';


import {ArticleModel} from '../models/article.model';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './edit-article.form.component.html',
  styleUrls: ['./edit-article.form.component.css']
})
export class EditArticleComponent implements OnInit {
  public articleId: string;
  public model: ArticleModel;
  public article: Object;

  public articleForm: FormGroup;
  public categories: string[];
  public contentMessage: string;
  public published: string;

  private contentValidationMessage = {
    required: 'Content is required!',
    minlength: 'Content should be at least 10 symbols long!'
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router) {
    this.categories = ['Nail Art', 'Manicure', 'Nail Forms'];
    this.published = new Date(Date.now()).toDateString();
    this.articleId = route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.getArticleForEditing(this.articleId);
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      image: ['', [Validators.required]],
      content: [''],
      category: this.categories[0],
      published: new Date()
    });


    this.articleForm.get('category').valueChanges.subscribe(console.log);
    this.articleForm.get('author').valueChanges.subscribe(console.log);


    const contentControl = this.articleForm.get('content');
    contentControl.valueChanges.debounceTime(1000).subscribe(value => {
      this.setMessage(contentControl);
    });

  }

  getArticleForEditing(id) {
    this.articleService.getArticleById(id)
      .subscribe(data => {
        this.article = data;
        console.log(this.article);

      });
  }

  setMessage(c: AbstractControl): void {
    this.contentMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.contentMessage = Object.keys(c.errors)
        .map(key => this.contentValidationMessage[key])
        .join(' ');
    }
  }

  editArticle(id) {
    this.model = new ArticleModel(
      this.articleForm.get('title').value,
      this.articleForm.get('author').value,
      localStorage.getItem('username'),
      this.articleForm.get('image').value,
      this.articleForm.get('content').value,
      this.articleForm.get('category').value,
      this.published);
    console.log(this.model);
    this.articleService.editArticleById(this.model, id)
      .subscribe(data => {
          this.router.navigate(['']);
        },
        err => {
          console.log(err);
        });
  }

}

