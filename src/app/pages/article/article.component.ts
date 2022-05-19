import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
    
  @Input() article?: Article;
  @Output() deletedArticle : EventEmitter<Article> = new EventEmitter();
  myDate?: string;

  constructor(private router : Router){
    if(this.article?.date == null){
    }
  }

  ngOnInit(): void {
  }

  delete(){
    this.deletedArticle.emit(this.article);
  }

  read(){
    this.router.navigateByUrl('/article/' + this.article?.id);
  }

}
