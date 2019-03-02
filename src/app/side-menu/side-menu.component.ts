import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  // allParagraphs: Entry<any>[] = [];

  @Input() allParagraphs: Entry<any>[] = [];
  @Input() page: string;
  @Output() outLesson: EventEmitter<any> = new EventEmitter();


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);
  }

  getLesson(title) {
    this.outLesson.emit(title);
  }

}
