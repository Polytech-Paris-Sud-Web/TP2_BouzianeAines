import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleSource } from 'src/app/services/article/article.source';
import { Router } from '@angular/router';
import { AuthorSource } from 'src/app/services/author/author.source';
import { AuthorBio } from 'src/app/model/Author';


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
})
export class ArticleCreationComponent implements OnInit {
  articleForm : FormGroup;

  constructor(private fb: FormBuilder, private articleSource: ArticleSource, private authorSource: AuthorSource, private router : Router) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
  }

  ngOnInit(): void {
  }

  createArticle(){
    const newArticle = {
      title : this.articleForm.value.title,
      content : this.articleForm.value.content,
      author : this.articleForm.value.authors,
      date : new Date()
    };

    const newAuthor = {
      id: this.articleForm.value.authors,
      content: 'Empty description'
    }

    this.articleSource.newArticle(newArticle).subscribe();    
    this.authorSource.newAuthor(newAuthor).subscribe(() => this.router.navigateByUrl('/'));
  }
  
}
