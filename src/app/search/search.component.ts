import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchedNews: Entry<any>[] = [];
  searchedParagraphs: Entry<any>[] = [];
  searchedVideos: Entry<any>[] = [];
  // keyWord: string;
  keyWord = this.route.snapshot.paramMap.get('id').toLocaleLowerCase();
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentfulService: ContentfulService
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);

    this.search(this.lang, this.keyWord);
  }

  search(lang, keyWord) {
    this.contentfulService.getAllNews(lang)
    .then(news => {
      this.searchedNews = news.filter(function(item) {
          return JSON.stringify(item).toLowerCase().includes(keyWord);
        }
      );
    });

    this.contentfulService.getLessonsContent(lang)
    .then(paragraps => {
      this.searchedParagraphs = paragraps.filter(function(item) {
          return JSON.stringify(item).toLowerCase().includes(keyWord);
        }
      );
    });

    this.contentfulService.getVideosContent(lang)
    .then(paragraps => {
      this.searchedVideos = paragraps.filter(function(item) {
          return JSON.stringify(item).toLowerCase().includes(keyWord);
        }
      );
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
