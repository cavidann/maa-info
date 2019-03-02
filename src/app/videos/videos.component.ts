import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  id: string;
  isOpen: boolean;
  video:  Entry<any>;
  lang: string;
  isParagraphSelected: boolean;
  allVideos: Entry<any>[] = [];
  page = 'videos';
  dangerousVideoUrl;
  videoUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentfulService: ContentfulService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isOpen = false;
    this.id = this.route.snapshot.paramMap.get('id');

    this.lang = this.router.url.substring(1, 3);
    this.getVideo(this.id);

    this.checkVideosLink();

    this.lang = this.router.url.substring(1, 3);
    this.getVideosParagraph(this.lang);
  }



  getVideosParagraph(lang) {
    this.contentfulService.getVideosParagraph(lang)
    .then(paragraph => {
      this.allVideos = paragraph;
    });
  }

  setCondition() {
    this.isOpen = !this.isOpen;
  }

  getVideo(name) {
    this.isOpen = false;
    this.contentfulService.getVideoContent(this.lang, name)
    .then(video => {
      this.video = video;
      this.updateVideoUrl();
    });
  }

  updateVideoUrl() {
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.video.fields.videoId;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  checkVideosLink() {
    if (this.router.url !== '/' + this.lang + '/videos/learn') {
      this.isParagraphSelected = true;
    } else {
      this.isParagraphSelected = false;
    }
  }

}
