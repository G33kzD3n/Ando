import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { Component, } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { QuestionPage } from "../question/question";
import { AppServiceProvider } from '../../providers/app-service/app-service';
//import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public latestId: any;
  public paginatedUrl: any;
  public pagination = {
    limit: 0, total_count: 0,
    current_page: 0, total_pages: 0
  };
  public pageTitle: string;
  public questions = [];
  public pages: Array<{ url: any, title: any }>;
  public items = [];
  public errors: any;
  constructor(
    //private userService: UserServiceProvider,
    public app: AppServiceProvider, private http: Http,
    public navCtrl: NavController, public navParam: NavParams,) {
    this.app.setPageUri('/questions');
    this.paginatedUrl = this.app.getPageUri();
  }
  /**
   * Pushes The given page.
   * @param uri : string
   */
  pushPage(uri: string) {
    this.app.setPageUri(uri);
    this.navCtrl.push(QuestionPage);
  }

  ionViewWillEnter() {
    this.loadQuestions(this.paginatedUrl);
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
        this.questions = result[0].data;
        this.pagination = result[0].pagination;
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
   * Makes the paginated PageUri 
   * @param itemsPerPage 
   * @param currentPageNo 
   * @returns paginatedUri string
   */
  private makePaginatedUrl(pageUri: string, itemsPerPage: number, currentPageNo) {
    return pageUri + '?limit=' + itemsPerPage + '&page=' + currentPageNo;
  }
  /**
   * Scroll for more questions
   * @param infiniteScroll 
   */
  scrollDown(infiniteScroll) {
    this.app.showLoader('Loading wait....');
      this.latestId = this.questions[0].id;
      let current_page = 1 + this.pagination.current_page;
      this.paginatedUrl = this.makePaginatedUrl(this.app.getPageUri(), this.pagination.limit, current_page);
      if (this.pagination.current_page >= 1 && this.pagination.current_page < this.pagination.total_pages) {
        this.http.get(this.paginatedUrl)
          .map(res => res.json())
          .subscribe(result => {
            this.pagination = result[0].pagination;
            console.log(result[0].pagination);
            this.questions = this.questions.concat(this.questions, result[0].data);
            if (this.noPagesLeft(this.pagination)) {
              this.paginatedUrl = this.app.getPageUri();
              this.app.showToast('Nothing more', 'top');
              infiniteScroll.complete();
              infiniteScroll.enable(false);
            }
          },
          errors => {
            this.errors = errors;
            if (this.errors) {
              console.log(this.app.loader);
              this.app.removeLoader();
              this.app.showToast('Something Went Wrong', 'top');
              infiniteScroll.complete();
            }
          },
          () => {
            infiniteScroll.complete();
            this.app.removeLoader();
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
        console.log(result[0].data[0].id);
        console.log(this.latestId);
        this.paginatedUrl = this.app.getPageUri();
        this.questions = this.questions.concat(result[0].data);
        this.pagination = result[0].pagination;
      },
      errors => {
        this.errors = errors;
        if (this.errors) {
          console.log(this.app.loader);
          this.app.removeLoader();
          this.app.showToast('Something Went Wrong', 'top');
          refresher.complete();
        }
      },
      () => {
        this.app.removeLoader();
        setTimeout(() => {
          if (this.latestId === this.questions[0].id) {
            this.app.showToast('No new feeds!', 'top');
            refresher.complete();
          }
        }, 0);
      }
      );
    console.log('async opts ended');
  }

  noPagesLeft(pagination) {
    if (pagination.current_page < pagination.total_pages) {
      return false;
    }
    else return true;
  }
}