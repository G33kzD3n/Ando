import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public pageTitle: string;
  public user : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams , private storage : Storage ) {
    this.user  = this.navParams.get('data');
    this.pageTitle = "Profile ";
  }

  ionViewDidLoad() {
    console.log(this.user);
    this.storage.get('token').then((val) => {
      console.log('Your token is ', val);
    });
  }

}
