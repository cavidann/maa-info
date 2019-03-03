import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulService } from '../services/contentful.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchedNews: Entry<any>[] = [];
  searchedParagraphs: Entry<any>[] = [];
  searchedVideos: Entry<any>[] = [];
  lang: string;
  activeImgName: string;

  images = [
    {name: 'e-1'},
    {name: 'e-2'},
    {name: 'e-3'},
    {name: 'e-4'},
    {name: 'e-5'},
  ];

  constructor(
    private router: Router,
    private contentfulService: ContentfulService
  ) { }

  ngOnInit() {

    this.lang = this.router.url.substring(1, 3);

    this.activeImgName = this.images[0].name;
    this.slideImage();
    this.lang = this.router.url.substring(1, 3);
    this.getDatas(this.lang);
  }

  slideImage() {
    let i = 0;
    setInterval(() => {
      if (i >= this.images.length - 1) {
        i = 0;
      } else {
        i++;
      }
      this.activeImgName = this.images[i].name;
    }, 4000);
  }

  getDatas(lang) {
    const query = {
      'limit': 6
    };

    const query1 = {
      'limit': 3
    };

    this.contentfulService.getLessonsContent(lang, query)
    .then(paragraphs => {
      this.searchedParagraphs = paragraphs;
    });

    this.contentfulService.getAllNews(lang, query1)
    .then(news => {
      this.searchedNews = news;
    });

    this.contentfulService.getVideosContent(lang, query1)
    .then(videos => {
      this.searchedVideos = videos;
    });
  }

  goToNewsDetailPage(workId) {
    this.router.navigate([this.lang + '/details', workId]);
  }

  goToParagraphsDetailPage(paragraphTitle) {
    this.router.navigate([this.lang + '/paragraph', paragraphTitle]);
  }

  goToVideosDetailPage(videoTitle) {
    this.router.navigate([this.lang + '/videos', videoTitle]);
  }

}
