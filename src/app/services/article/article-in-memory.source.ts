import { Inject, Injectable } from '@angular/core';
import { Article, NewArticle } from 'src/app/model/Article';
import { Observable, of } from "rxjs";
import { ArticleSource } from './article.source';

@Injectable()
export class ArticleInMemorySource implements ArticleSource {

  constructor(@Inject(Array<Article>()) private articles: Article[] =  []) { }

  public getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  public getArticle(id: number): Observable<Article> {
    const article = this.articles.find(_ => _.id === id);
    if(article){
        return of(article);
    } else {
        throw new Error(`Article not found for id ${id}`)
    }
  }

  public removeArticle(id: number): Observable<void>  {
    this.articles = this.articles.filter(_ => _.id !== id)
    return of(undefined);
  }

  public newArticle(article: NewArticle): Observable<Article> {
    const newArticle = {
        id: this.articles.length,
        title: article.title,
        content: article.content,
        date: article.date,
        author : article.author 
    };

    this.articles.push(newArticle);
    return of(newArticle);
  }
}

