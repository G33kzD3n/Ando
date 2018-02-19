import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
import { ProfilePage } from '../profile/profile';
import { PublishQuestionPage } from "../publish-question/publish-question";
import { LogoutPage } from '../logout/logout';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { MyQuestionsPage } from '../my-questions/my-questions';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  public token: any;
  public loader: any;
  @ViewChild(Nav) nav: Nav;
  public rootPage: any;
  public pages: Array<{ title: string, component: any, icon: any }>;

  constructor(
    private userService: UserServiceProvider, public navParam: NavParams,
    public navCtrl: NavController,
  ) { }
  showMenu(loggedIn) {
    if (loggedIn === true) {
      this.pages = [
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'Publish Question', component: PublishQuestionPage, icon: 'add' },
        { title: 'My Questions', component: MyQuestionsPage, icon: 'add' },
        { title: 'Profile', component: ProfilePage, icon: 'person' },
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
    try {
      this.userService.getToken().then((value) => {
        this.nav.setRoot(HomePage, { token: value });
        this.token = value;
        setTimeout(() => {
          if (this.token != null) {
            this.showMenu(true);
          } else {
            this.showMenu(false);
          }
        }, 300);
      });
    } catch (e) {
      //this.nav.setRoot(HomePage);
      console.log('Something went wrong');
    }
  }

  /**
   * Open the given page
   * @param page :any
   * @returns Loads the page dynamically
   */
  openPage(page: any) {
    if (page.title != "Home") {
      this.navCtrl.push(page.component, { token: this.token });
    }
    else {
      this.nav.setRoot(HomePage, { token: this.token });
    }
  }
}