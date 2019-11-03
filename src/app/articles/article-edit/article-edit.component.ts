import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as ArticlesActions from '../store/article.actions';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  articleForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newArticle = new Article(
    //   this.articleForm.value['name'],
    //   this.articleForm.value['description'],
    //   this.articleForm.value['imagePath'],
    if (this.editMode) {
      // this.articleService.updateArticle(this.id, this.articleForm.value);
      this.store.dispatch(
        new ArticlesActions.UpdateArticle({
          index: this.id,
          newArticle: this.articleForm.value
        })
      );
    } else {
      // this.articleService.addArticle(this.articleForm.value);
      this.store.dispatch(new ArticlesActions.AddArticle(this.articleForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let articleName = '';
    let articleImagePath = '';
    let articleDescription = '';

    if (this.editMode) {
      // const article = this.articleService.getArticle(this.id);
      this.storeSub = this.store
        .select('articles')
        .pipe(
          map(articleState => {
            return articleState.articles.find((article, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(article => {
          articleName = article.name;
          articleImagePath = article.imagePath;
          articleDescription = article.description;
        });
    }

    this.articleForm = new FormGroup({
      name: new FormControl(articleName, Validators.required),
      imagePath: new FormControl(articleImagePath, Validators.required),
      description: new FormControl(articleDescription, Validators.required)
    });
  }
}
