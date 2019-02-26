import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';

import { RemovewhitespacesPipe } from './pipes/removewhitespaces.pipe';
import { MdToHtmlPipe } from './pipes/md-to-html.pipe';

import { PagerService } from './services/pager.service';

// const routes: Routes = [
//   { path: '', redirectTo: 'az/home', pathMatch: 'full' },
//   { path: ':lang/home', component: HomeComponent},
//   { path: ':lang/paragraph', children: [
//     { path: '', redirectTo: 'learn', pathMatch: 'full' },
//     { path: 'learn', component: ParagraphComponent },
//     { path: ':id', component: ParagraphComponent}
//   ]},
//   { path: ':lang/news', children: [
//     { path: '', redirectTo: '1', pathMatch: 'full' },
//     { path: ':id', component: NewsComponent }
//   ]},
//   { path: ':lang/details/:id', component: DetailsComponent },
//   { path: 'contactus', component: ContactComponent, outlet: 'popup'},
//   { path: ':lang/search/:id', component: SearchComponent },
//   { path: 'error', component: NotFoundComponent },
//   { path: '**', redirectTo: 'error', pathMatch: 'full' }
// ];

const routes: Routes = [
  { path: '', redirectTo: 'az/home', pathMatch: 'full' },
  { path: 'az/home', component: HomeComponent},
  { path: 'ru/home', component: HomeComponent},
  { path: 'az/paragraph', children: [
    { path: '', redirectTo: 'learn', pathMatch: 'full' },
    { path: 'learn', component: ParagraphComponent },
    { path: ':id', component: ParagraphComponent}
  ]},
  { path: 'ru/paragraph', children: [
    { path: '', redirectTo: 'learn', pathMatch: 'full' },
    { path: 'learn', component: ParagraphComponent },
    { path: ':id', component: ParagraphComponent}
  ]},
  { path: 'az/news', children: [
    { path: '', redirectTo: '1', pathMatch: 'full' },
    { path: ':id', component: NewsComponent }
  ]},
  { path: 'ru/news', children: [
    { path: '', redirectTo: '1', pathMatch: 'full' },
    { path: ':id', component: NewsComponent }
  ]},
  { path: 'az/details/:id', component: DetailsComponent },
  { path: 'ru/details/:id', component: DetailsComponent },
  { path: 'contactus', component: ContactComponent, outlet: 'popup'},
  { path: 'az/search/:id', component: SearchComponent },
  { path: 'ru/search/:id', component: SearchComponent },
  { path: 'az/error', component: NotFoundComponent },
  { path: '**', redirectTo: 'az/error', pathMatch: 'full' }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TopMenuComponent,
    FooterComponent,
    ParagraphComponent,
    HomeComponent,
    ContactComponent,
    RemovewhitespacesPipe,
    MdToHtmlPipe,
    NewsComponent,
    DetailsComponent,
    PaginationComponent,
    SearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
