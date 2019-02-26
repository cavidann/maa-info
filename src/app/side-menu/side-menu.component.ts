import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  lang: string;
  allParagraphs: Entry<any>[] = [];

  @Output() outLesson: EventEmitter<any> = new EventEmitter();


  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);
    this.getParagraphs(this.lang);
  }

  getParagraphs(lang) {
    this.contentfulService.getParagraphs(lang)
    .then(paragraph => {
      this.allParagraphs = paragraph;
      // console.log(this.allParagraphs);
    });
  }

  getLesson(title) {
    // console.log(title);

    this.outLesson.emit(title);
  }

}
