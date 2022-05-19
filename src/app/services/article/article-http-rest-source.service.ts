import { Injectable } from '@angular/core';
import { Article, NewArticle } from 'src/app/model/Article';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleSource } from './article.source';

@Injectable()
export class ArticleHttpRestSource implements ArticleSource {

  constructor(private readonly http : HttpClient) { }

  private static readonly pathArticles:string = "https://my-json-server.typicode.com/Polytech-Paris-Sud-Web/TP2_BouzianeAines/articles";

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(ArticleHttpRestSource.pathArticles);
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${ArticleHttpRestSource.pathArticles}/${id}`);
  }

  public removeArticle(id: number): Observable<void> {
    return this.http.delete<any>(`${ArticleHttpRestSource.pathArticles}/${id}`);
  }

  public newArticle(article: NewArticle): Observable<Article> {
    return this.http.post<Article>(`${ArticleHttpRestSource.pathArticles}`, article);
  }
}

