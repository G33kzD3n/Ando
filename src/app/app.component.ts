import { Platform } from 'ionic-angular';
import { Component , ViewChild  } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';


import { LoginPage } from '../pages/login/login';

@Component({
  template: '<ion-nav #myNav [root]="rootPage"></ion-nav>',

})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
