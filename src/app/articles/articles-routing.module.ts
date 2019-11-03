import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles.component';
import { AuthGuard } from '../auth/auth.guard';
import { ArticleStartComponent } from './article-start/article-start.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesResolverService } from './articles-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ArticleStartComponent },
      { path: 'new', component: ArticleEditComponent },
      {
        path: ':id',
        component: ArticleDetailComponent,
        resolve: [ArticlesResolverService]
      },
      {
        path: ':id/edit',
        component: ArticleEditComponent,
        resolve: [ArticlesResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
