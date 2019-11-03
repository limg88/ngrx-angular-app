import { Component, OnInit, Input } from '@angular/core';

import { Article } from '../../article.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;

  ngOnInit() {
  }
}
