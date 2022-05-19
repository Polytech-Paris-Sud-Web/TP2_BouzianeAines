import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/Article';
import { ArticleSource } from 'src/app/services/article/article.source';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit {

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

  removeFromBDD(article : Article){
    this.articleSource.removeArticle(article.id).subscribe({next: () => this.articleSource.getArticles().subscribe({next: (data) => this.articles = data})});
  }  

}
