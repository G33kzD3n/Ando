import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
//import { ProfilePage } from '../profile/profile';
import { PublishQuestionPage } from "../publish-question/publish-question";
import { LogoutPage } from '../logout/logout';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AppServiceProvider } from '../../providers/app-service/app-service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  public token: any;
  public loader: any;
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = HomePage;
  public pages: Array<{ title: string, component: any, icon: any }>;
  constructor(public loadingCtrl: LoadingController,
    private userService: UserServiceProvider, private app: AppServiceProvider,
    public navCtrl: NavController, public navParam: NavParams,
  ) {
  }
  showMenu(loggedIn) {
    if (loggedIn === true) {
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'Publish Question', component: PublishQuestionPage, icon: 'add' },
        { title: 'Profile', component: HomePage, icon: 'person' },
        { title: 'Settings', component: HomePage, icon: 'settings' },
        { title: 'Logout', component: LogoutPage, icon: 'key' }
      ];
    }
    else {
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'Login', component: LoginPage, icon: 'key' },
        { title: 'Signup', component: SignupPage, icon: 'key' }
      ];
    }
  }
  ionViewWillEnter() {
    this.showMenu(this.userService.isLoggedIn());
  }

  /**
   * Open the given page
   * @param page :any
   * @returns Loads the page dynamically
   */
  openPage(page: any) {
    console.log('from open Page');
    console.log(this.loader);
    if (page.title != "Home") {
      this.navCtrl.push(page.component,
        { loader: this.app.loader });
    }
  }
}