import { Action } from '@ngrx/store';

import { Article } from '../article.model';

export const SET_ARTICLES = '[Articles] Set Articles';
export const FETCH_ARTICLES = '[Articles] Fetch Articles';
export const ADD_ARTICLE = '[Article] Add Article';
export const UPDATE_ARTICLE = '[Article] Update Article';
export const DELETE_ARTICLE = '[Article] Delete Article';
export const STORE_ARTICLES = '[Article] Store Articles';

export class SetArticles implements Action {
  readonly type = SET_ARTICLES;

  constructor(public payload: Article[]) {}
}

export class FetchArticles implements Action {
  readonly type = FETCH_ARTICLES;
}

export class AddArticle implements Action {
  readonly type = ADD_ARTICLE;

  constructor(public payload: Article) {}
}

export class UpdateArticle implements Action {
  readonly type = UPDATE_ARTICLE;

  constructor(public payload: { index: number; newArticle: Article }) {}
}

export class DeleteArticle implements Action {
  readonly type = DELETE_ARTICLE;

  constructor(public payload: number) {}
}

export class StoreArticles implements Action {
  readonly type = STORE_ARTICLES;
}

export type ArticlesActions =
  | SetArticles
  | FetchArticles
  | AddArticle
  | UpdateArticle
  | DeleteArticle
  | StoreArticles;
