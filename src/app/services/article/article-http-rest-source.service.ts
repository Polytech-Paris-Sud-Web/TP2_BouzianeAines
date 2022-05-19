import { Injectable } from '@angular/core';
import { Article, NewArticle } from 'src/app/model/Article';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleSource } from './article.source';

@Injectable()
export class ArticleHttpRestSource implements ArticleSource {

  constructor(private readonly http : HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public removeArticle(id: number): Observable<void> {
    return this.http.delete<any>(`http://localhost:3000/articles/${id}`);
  }

  public newArticle(article: NewArticle): Observable<Article> {
    return this.http.post<Article>('http://localhost:3000/articles/', article);
  }
}

