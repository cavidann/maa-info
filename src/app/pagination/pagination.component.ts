import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  lang: string;
  activedPage: number;

  @Input() pager;
  @Output() setPage: EventEmitter<any> = new EventEmitter();

  constructor(
    // private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.lang = this.router.url.substring(1, 3);
  }

  setCurrentPage(pageNumber: number) {
    this.router.navigate([this.lang + '/news/' + pageNumber]);
    // console.log('2');
    this.setPage.emit(pageNumber);
  }

}
