import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleSource } from 'src/app/services/article/article.source';

@Component({
  selector: 'app-articles-top',
  templateUrl: './articles-top.component.html',
})
export class ArticlesTopComponent implements OnInit {

  articles: Article[] = [];
  query: string;

  constructor(private articleSource: ArticleSource) {     
    this.articleSource.getArticles().subscribe((articles) => {
      this.articles = articles
    })
    this.query = "";
  }

  ngOnInit(): void {
  }

  get sortData() {
    return this.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  }
}
