import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // this.translate.use('az');
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
