import { Article, NewArticle } from 'src/app/model/Article';
import { Observable } from "rxjs";

export abstract class ArticleSource {

    abstract getArticles(): Observable<Article[]>;

    abstract getArticle(id: number): Observable<Article>;

    abstract removeArticle(id: number): Observable<void>;

    abstract newArticle(article: NewArticle): Observable<Article>;
}

