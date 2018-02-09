import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuestionPage } from "../question/question";
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ProfilePage } from '../profile/profile';
//import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public canWeLoadMoreContent: boolean;
  public limit: any = 0;
  public totalPages: number = 1;
  public currentPage: number = 1;
  public latestId: any;
  public paginatedUrl: any;
  public pagination: any;
  public scroll: any = null;
  public pageTitle: string;
  public questions = [];
  public pages: Array<{ url: any, title: any }>;
  public items = [];
  public errors: any;
  constructor(
    public app: AppServiceProvider, private http: Http, private userService: UserServiceProvider,
    public navCtrl: NavController, public navParam: NavParams, ) {

  }
  /**
   * Makes the paginated PageUri 
   * @param itemsPerPage 
   * @param currentPageNo 
   * @returns paginatedUri string
   */
  private makePaginatedUrl(pageUri: string, itemsPerPage: number, currentPageNo) {
    return pageUri + '?limit=' + itemsPerPage + '&page=' + currentPageNo;
  }
  /**
   * Pushes The given page.
   * @param uri : string
   */
  pushPage(uri: string) {
    this.app.setPageUri(uri);
    this.navCtrl.push(QuestionPage, { token: this.navParam.get('token') });
  }
  
  ionViewWillEnter() {
    this.app.setPageUri('/questions');
    this.paginatedUrl = this.app.getPageUri();
    this.loadQuestions(this.paginatedUrl);
    this.canWeLoadMoreContent = true;
    console.log('the user is loggedin');
    this.userService.getToken().then((value) => {
      console.log('the token is');
      console.log(value);
    });
    if (this.scroll) {
      this.scroll.enable(true);
    }

  }
  /**
   * Load questions resource.
   * @param url 
   */
  loadQuestions(url: string) {
    this.app.showLoader('Loading wait...');
    this.http.get(url)
      .map(res => res.json())
      .subscribe(result => {
        this.questions = result.data;
        this.pagination = result.pagination;
        this.latestId = this.questions[0].id;
      },
      errors => {
        this.errors = errors.status;
        if (this.errors == 0) {
          this.app.removeLoader();
          this.app.showToast('Something went wrong', 'top');
        }
      },
      () => {
        this.app.removeLoader();
      }
      );
  }
  /**
   * Scroll for more questions
   * @param infiniteScroll 
   */
  scrollDown(infiniteScroll) {
    this.scroll = infiniteScroll;
    this.app.showLoader('Loading wait....');
    this.currentPage = 1 + this.pagination.current_page;
    this.paginatedUrl = this.makePaginatedUrl(this.app.getPageUri(), this.limit, this.currentPage);
    if (this.pagesLeft(this.pagination) === true) {
      this.http.get(this.paginatedUrl)
        .map(res => res.json())
        .subscribe(result => {
          this.pagination = result.pagination;
          this.questions = this.questions.concat(result.data);
          if (this.pagesLeft(this.pagination) === null) {
            this.paginatedUrl = this.app.getPageUri();
            this.app.showToast('Nothing more', 'top');
            this.canWeLoadMoreContent = false;
            this.scroll.complete();
          }
        },
        errors => {
          this.errors = errors;
          if (this.errors) {
            this.app.removeLoader();
            this.app.showToast('Something Went Wrong', 'top');
            this.scroll.complete();
          }
        },
        () => {
          this.app.removeLoader();
          this.scroll.complete();
        }
        );
    }

    console.log('Async operation has ended');
  }

  doRefresh(refresher) {
    this.app.showLoader('Refreshing wait....');
    console.log('begin Async operation');
    this.http.get(this.app.getPageUri())
      .map(res => res.json())
      .subscribe(result => {
        this.paginatedUrl = this.app.getPageUri();
        this.pagination = result.pagination;
        if (this.latestId === result.data[0].id) {
          console.log('nothing new');
          this.app.showToast('No new feeds!', 'top');
        }
        else {
          this.questions = result.data;
          this.latestId = this.questions[0].id;
          this.scroll.enable(true);
        }
      },
      errors => {
        this.errors = errors;
        if (this.errors) {
          this.app.removeLoader();
          this.app.showToast('Something Went Wrong', 'top');
          refresher.complete();
        }
      },
      () => {
        this.app.removeLoader();
        refresher.complete();
      }
      );
    console.log('async opts ended');
  }

  pagesLeft(pagination) {
    if (pagination.current_page > pagination.total_pages) {
      return null;
    }
    else {
      return true;
    }
  }

  showProfile(username){
    this.navCtrl.push(ProfilePage,{username:username});
  }
}