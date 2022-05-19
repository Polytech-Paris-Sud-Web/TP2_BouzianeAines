import { Injectable, Inject } from '@angular/core';
import { AuthorBio } from '../../model/Author';
import { Observable, of } from 'rxjs';
import { AuthorSource } from './author.source';

@Injectable()
export class AuthorInMemorySource implements AuthorSource {

  constructor(@Inject(Array<AuthorBio>()) private authors: AuthorBio[] =  []) { }

  public getAuthorByName(id: string): Observable<AuthorBio> {
    const author = this.authors.find(_ => _.id === id);
    if(author){
        return of(author);
    } else {
        throw new Error(`Article not found for id ${id}`)
    }
  }

  public getAuthors(): Observable<AuthorBio[]> {
    return of(this.authors) ;
  }

  public newAuthor(newAuthor: AuthorBio): Observable<AuthorBio> {    
    const author = this.authors.find(_ => _.id === newAuthor.id);
    if(!author){
        this.authors.push(newAuthor);        
    }
    return of(newAuthor);
  }
}
