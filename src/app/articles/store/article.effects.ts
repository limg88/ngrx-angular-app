import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as ArticlesActions from './article.actions';
import { Article } from '../article.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class ArticleEffects {
  @Effect()
  fetchArticles = this.actions$.pipe(
    ofType(ArticlesActions.FETCH_ARTICLES),
    switchMap(() => {
      return this.http.get<Article[]>(
        'https://ngrx-angular-app.firebaseio.com/articles.json'
      );
    }),
    map(articles => {
      return articles.map(article => {
        return {
          ...article        };
      });
    }),
    map(articles => {
      return new ArticlesActions.SetArticles(articles);
    })
  );

  @Effect({dispatch: false})
  storeArticles = this.actions$.pipe(
    ofType(ArticlesActions.STORE_ARTICLES),
    withLatestFrom(this.store.select('articles')),
    switchMap(([actionData, articlesState]) => {
      return this.http.put(
        'https://ngrx-angular-app.firebaseio.com/articles.json',
        articlesState.articles
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
