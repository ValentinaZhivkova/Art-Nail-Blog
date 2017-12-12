import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive.form.component.html'
})
export class ReactiveFormComponent implements OnInit {
  public articleForm: FormGroup;
  public categories: string[];
  public contentMessage: string;
  public published: Date;

  private contentValidationMessage = {
    required: 'Content is required!',
    minlength: 'Content should be at least 10 symbols long!'
  };

  constructor(private fb: FormBuilder) {
    this.categories = ['Nail Art', 'Manicure', 'Nail Forms'];
    this.published = new Date;
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(10)]],
      image: '',
      content: '',
      category: this.categories[0],
      published: Date.now()
    });

    this.articleForm.get('category').valueChanges.subscribe(console.log);
    this.articleForm.get('author').valueChanges.subscribe(console.log);

    const contentControl = this.articleForm.get('content')
    contentControl.valueChanges.debounceTime(1000).subscribe(value => {
      this.setMessage(contentControl);
    });


    // this.articleForm = new FormGroup({
    //  title: new FormControl('Nails'),
    //  author: new FormControl('Valentinca'),
    //  content: new FormControl('some other content'),
    //  category: new FormControl(this.categories[0])
    // });


  }

  setMessage(c: AbstractControl): void {
    this.contentMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.contentMessage = Object.keys(c.errors)
        .map(key => this.contentValidationMessage[key])
        .join(' ');
    }
  }

  save() {

  }

}

