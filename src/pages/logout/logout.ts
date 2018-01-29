import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuPage } from '../menu/menu';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AppServiceProvider } from '../../providers/app-service/app-service';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(private app:AppServiceProvider,
     public navCtrl: NavController, public navParams: NavParams,
     private userService: UserServiceProvider ) {
     this.userService.flushStorage();
  }
  ionViewDidLoad() {
      this.navCtrl.setRoot(MenuPage);
        this.app.showToast('Logout successfull!','top');
    }
  }