import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { ProfilePage } from '../profile/profile';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: '../menu/menu.html'
})

export class HomePage {
  public pageTitle  : string;
  public pages      : Array<{title :string, component: any}>;

  constructor(public navCtrl : NavController, public navParam : NavParams , public alertCtrl : AlertController)
  { 
    this.pageTitle ="Home";
    this.pages = [
      { title : 'Profile', component : ProfilePage},
      { title : 'Logout',  component : LoginPage }
    ];
  }
  
  /** 
   * @param page which is a object having title and component
   * @returns dynamically loads the view of the object recieved.  
   */
  openPage(page){
    if ( page.component == LoginPage ){
      let confirm = this.alertCtrl.create({
        title: 'Logout',
        message: "Do you really want to logout?",
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
     this.navCtrl.push(page.component,{
      userName  : this.navParam.get('userName')
    });
  }
}