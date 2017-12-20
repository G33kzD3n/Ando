import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams , AlertController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = HomePage;
  public pages: Array<{ title: string, component: any, icon: any }>;
  
  constructor(public navCtrl: NavController, public navParam: NavParams, public alertCtrl: AlertController) {
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Profile', component: ProfilePage, icon: 'person' },
      { title: 'Logout', component: LoginPage, icon: 'key' }
    ];
  }
  
  /** 
   * @param page which is a object having title and component
   * @returns dynamically loads the view of the object recieved.  
   */
  openPage(page) {
    if (page.component == LoginPage) {
      let confirm = this.alertCtrl.create({
        title: 'Logout?',
        message: "Do you really want to logout.",
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
            }
          },
          {
            text: 'Agree',
            handler: () => {
              this.navCtrl.setRoot(page.component, {
                Message: "Thanks " + this.navParam.get('userName') + " ! Login again."
              });
            }
          }
        ]
      });
      confirm.present();
    }
    else
      this.nav.setRoot(page.component, {
        pageTitle:page.title,
        userName: this.navParam.get('userName')
      });
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MenuPage');
  // }

}
