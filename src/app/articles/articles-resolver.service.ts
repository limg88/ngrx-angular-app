import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Article } from './article.model';
import * as fromApp from '../store/app.reducer';
import * as ArticlesActions from '../articles/store/article.actions';

@Injectable({ providedIn: 'root' })
export class ArticlesResolverService implements Resolve<Article[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchArticles();
    return this.store.select('articles').pipe(
      take(1),
      map(articlesState => {
        return articlesState.articles;
      }),
      switchMap(articles => {
        if (articles.length === 0) {
          this.store.dispatch(new ArticlesActions.FetchArticles());
          return this.actions$.pipe(
            ofType(ArticlesActions.SET_ARTICLES),
            take(1)
          );
        } else {
          return of(articles);
        }
      })
    );
  }
}
