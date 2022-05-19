import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleCreationComponent } from './pages/article-creation/article-creation.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { ArticlesTopComponent } from './pages/articles-top/articles-top.component';

import { AuthorSource } from './services/author/author.source';
import { AuthorInMemorySource } from './services/author/author-in-memory.source';
import { AuthorHttpRestService } from './services/author/author-http-rest-source.service';
import { ArticleSource } from './services/article/article.source';
import { ArticleInMemorySource } from './services/article/article-in-memory.source';
import { ArticleHttpRestSource } from './services/article/article-http-rest-source.service';

import { SearchArticlePipe } from './pipes/searchArticle/search-article.pipe';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const appRoutes: Routes = [
  { path: 'create', component: ArticleCreationComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'article/:id', component: ArticleDetailsComponent},
  { path: 'articles/top10', component: ArticlesTopComponent},
  { path: '', component: ArticlesComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleCreationComponent,
    ArticleDetailsComponent,
    ArticlesTopComponent,
    SearchArticlePipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: ArticleSource, useFactory: (httpClient: HttpClient) => {
      if(environment.production){
        return new ArticleHttpRestSource(httpClient);
      } else {
        return new ArticleInMemorySource();
      }
    }, deps: [HttpClient]},
    {provide: AuthorSource, useFactory: (httpClient: HttpClient) => {
      if(environment.production){
        return new AuthorHttpRestService(httpClient);
      } else {
        return new AuthorInMemorySource();
      }
    }, deps: [HttpClient]},
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
