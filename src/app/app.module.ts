import { HttpModule } from "@angular/http";
import { TimeAgoPipe } from 'time-ago-pipe';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { QuestionPage } from "../pages/question/question";
import { AppServiceProvider } from '../providers/app-service/app-service';
import { PublishQuestionPage } from "../pages/publish-question/publish-question";
import { LogoutPage } from "../pages/logout/logout";
import { PaginationServiceProvider } from '../providers/pagination-service/pagination-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ErrorServiceProvider } from '../providers/error-service/error-service';


@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    TimeAgoPipe,
    QuestionPage,
    PublishQuestionPage,
    LogoutPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    QuestionPage,
    PublishQuestionPage,
    LogoutPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider,
    PaginationServiceProvider,
    UserServiceProvider,
    ErrorServiceProvider,
  ]
})
export class AppModule {}
