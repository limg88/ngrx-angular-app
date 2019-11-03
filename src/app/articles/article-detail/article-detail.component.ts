import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Article } from '../article.model';
import * as fromApp from '../../store/app.reducer';
import * as ArticlesActions from '../store/article.actions';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('articles');
        }),
        map(articlesState => {
          return articlesState.articles.find((article, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(article => {
        this.article = article;
      });
  }

  onEditArticle() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteArticle() {
    // this.articleService.deleteArticle(this.id);
    this.store.dispatch(new ArticlesActions.DeleteArticle(this.id));
    this.router.navigate(['/articles']);
  }
}
