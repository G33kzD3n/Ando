import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuestionPage } from "../question/question";
import { AppServiceProvider } from '../../providers/app-service/app-service';
//import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  limit: any=0;
  totalPages: number=1;
  currentPage:number=1;
  public latestId: any;
  public paginatedUrl: any;
  public pagination: any;
  scroll: any;
  public pageTitle: string;
  public questions = [];
  public pages: Array<{ url: any, title: any }>;
  public items = [];
  public errors: any;
  constructor(
    //private userService: UserServiceProvider,
    public app: AppServiceProvider, private http: Http,
    public navCtrl: NavController, public navParam: NavParams, ) {
    
  }
  /**
   * Pushes The given page.
   * @param uri : string
   */
  ngOnInit(){
  }
  pushPage(uri: string) {
    this.app.setPageUri(uri);
    this.navCtrl.push(QuestionPage);
  }
  ionViewWillEnter() {
    this.app.setPageUri('/questions');
    this.paginatedUrl=this.app.getPageUri();
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
    this.scroll = infiniteScroll;
    this.app.showLoader('Loading wait....');
    this.currentPage = 1 + this.pagination.current_page;
    this.paginatedUrl = this.makePaginatedUrl(this.app.getPageUri(),this.limit, this.currentPage);
    if (this.pagesLeft(this.pagination)===true) {
      this.http.get(this.paginatedUrl)
        .map(res => res.json())
        .subscribe(result=> {
          this.pagination=result[0].pagination;
          this.questions = this.questions.concat(result[0].data);
          if (this.pagesLeft(this.pagination)==null) {
            this.paginatedUrl = this.app.getPageUri();
            this.app.showToast('Nothing more', 'top');
            //this.scroll.complete();
           this.scroll.enable(false);
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
        this.pagination = result[0].pagination;
        if (this.latestId === result[0].data[0].id) {
          console.log('nothing new');
          this.app.showToast('No new feeds!', 'top');
        }
        else {
          this.questions = result[0].data;
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
}