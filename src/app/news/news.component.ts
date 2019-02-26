import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';
import { Router, ActivatedRoute } from '@angular/router';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  allNews: Entry<any>[] = [];
  lang: string;
  pager: any = {};
  // allItems: any[];
  pages: any[];
  pageSize = 1;
  activePage: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentfulService: ContentfulService,
    private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);
    this.getNews(this.lang);
    this.activePage = +this.route.snapshot.paramMap.get('id');

    // this.router.events.subscribe(
    //   () => {
    //     this.activePage = +this.route.snapshot.paramMap.get('id');
    //     this.getNews(this.lang);
    //   }
    // );
  }

  getNews(lang) {
    this.contentfulService.getAllNews(lang)
    .then(news => {
      this.allNews = news;
      this.setPage(this.activePage);
      // console.log(this.allNews);
    });
  }

  goToDetailPage(workId) {
    this.router.navigate([this.lang + '/details', workId]);
  }

  setPage(pageNumber: number) {
    // this.pagerService.show();
    this.pager = this.pagerService.getPager(this.allNews.length, pageNumber, this.pageSize);

    // // current page posts
    this.pages = this.allNews.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('2');
    // this.router.navigate([this.lang + '/news/' + this.activePage]);

  }

}
