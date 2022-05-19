import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthorBio } from '../../model/Author';
import { Observable } from 'rxjs';
import { AuthorSource } from './author.source';

@Injectable()
export class AuthorHttpRestService implements AuthorSource {

  constructor(private readonly http : HttpClient) { }

  private static readonly pathArticles:string = "https://my-json-server.typicode.com/Polytech-Paris-Sud-Web/TP2_BouzianeAines/authors";

  public getAuthorByName(id: string): Observable<AuthorBio> {
    return this.http.get<AuthorBio>(`${AuthorHttpRestService.pathArticles}/${id}`);
  }

  public getAuthors(): Observable<AuthorBio[]> {
    return this.http.get<AuthorBio[]>(AuthorHttpRestService.pathArticles);
  }

  public newAuthor(newAuthor: AuthorBio): Observable<AuthorBio> {
    return this.http.post<AuthorBio>(`${AuthorHttpRestService.pathArticles}/`, newAuthor);
  }
}
