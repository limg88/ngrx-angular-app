import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromArticles from '../articles/store/article.reducer';

export interface AppState {
  auth: fromAuth.State;
  articles: fromArticles.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  articles: fromArticles.articleReducer
};
