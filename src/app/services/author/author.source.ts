import { AuthorBio } from '../../model/Author';
import { Observable } from 'rxjs';

export abstract class AuthorSource {

  abstract getAuthorByName(name: string): Observable<AuthorBio>;

  abstract getAuthors(): Observable<AuthorBio[]>;

  abstract newAuthor(newAuthor : AuthorBio): Observable<AuthorBio>;
}
