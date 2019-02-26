import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  lang: string;
  news: Entry<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentfulService: ContentfulService,
    private location: Location
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);

    this.getNews(this.lang);

    // this.router.events.subscribe(
    //   () => {
    //     this.getNews(this.lang);
    //   }
    // );
  }

  getNews(lang) {
    const newsId = this.route.snapshot.paramMap.get('id');
    this.contentfulService.getNews(lang, newsId)
    .then((news) => {
      this.news = news;
      // console.log(this.news);
    });
  }

  getBack() {
    this.location.back();
  }

}
