import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MenuPage} from '../menu/menu';
import { LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public pageTitle : string;
  email :any;
  content :any;
  constructor(public navCtrl : NavController, public navParam : NavParams )
  {
    // this.email= navParam.get('userEmail');
    // this.pageTitle = navParam.get('pageTitle');
    this.pageTitle="HomePage";
  }
  showProfile(){
    this.pageTitle="Profile";

  }
  logout(){
    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.push(LoginPage);
  }
}
