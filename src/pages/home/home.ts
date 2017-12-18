import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public pageTitle  : string;
  public userName   : string;
  content :any;
  constructor(public navCtrl : NavController, public navParam : NavParams )
  {
  }
  ionViewWillEnter(): void {
    this.pageTitle = this.navParam.get('pageTitle');
    this.userName=this.navParam.get('userName');
  }
  showProfile(){
    this.pageTitle="Profile";

  }
  logout(){
    this.navCtrl.setRoot(LoginPage);
    // this.navCtrl.push(LoginPage);
  }
}
