import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticlesComponent } from './articles.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleItemComponent } from './article-list/article-item/article-item.component';
import { ArticleStartComponent } from './article-start/article-start.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleItemComponent,
    ArticleStartComponent,
    ArticleEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ArticlesRoutingModule,
    SharedModule
  ]
})
export class ArticlesModule {}
