import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthorBio } from '../../model/Author';
import { Observable } from 'rxjs';
import { AuthorSource } from './author.source';

@Injectable()
export class AuthorHttpRestService implements AuthorSource {

  constructor(private readonly http : HttpClient) { }

  public getAuthorByName(id: string): Observable<AuthorBio> {
    return this.http.get<AuthorBio>(`http://localhost:3000/authors/${id}`);
  }

  public getAuthors(): Observable<AuthorBio[]> {
    return this.http.get<AuthorBio[]>("http://localhost:3000/authors");
  }

  public newAuthor(newAuthor: AuthorBio): Observable<AuthorBio> {
    return this.http.post<AuthorBio>('http://localhost:3000/articles/', newAuthor);
  }
}
