import { Article } from '../article.model';
import * as ArticlesActions from './article.actions';

export interface State {
  articles: Article[];
}

const initialState: State = {
  articles: []
};

export function articleReducer(
  state = initialState,
  action: ArticlesActions.ArticlesActions
) {
  switch (action.type) {
    case ArticlesActions.SET_ARTICLES:
      return {
        ...state,
        articles: [...action.payload]
      };
    case ArticlesActions.ADD_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    case ArticlesActions.UPDATE_ARTICLE:
      const updatedArticle = {
        ...state.articles[action.payload.index],
        ...action.payload.newArticle
      };

      const updatedArticles = [...state.articles];
      updatedArticles[action.payload.index] = updatedArticle;

      return {
        ...state,
        articles: updatedArticles
      };
    case ArticlesActions.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((article, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
