import { HttpModule } from "@angular/http";
import { TimeAgoPipe } from 'time-ago-pipe';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from "../pages/logout/logout";
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { QuestionPage } from "../pages/question/question";
import { MyQuestionsPage } from "../pages/my-questions/my-questions";
import { EditQuestionPage } from "../pages/edit-question/edit-question";
import { AppServiceProvider } from '../providers/app-service/app-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { ErrorServiceProvider } from '../providers/error-service/error-service';
import { PublishQuestionPage } from "../pages/publish-question/publish-question";
import { PaginationServiceProvider } from '../providers/pagination-service/pagination-service';
import { QuestionServiceProvider } from '../providers/question-service/question-service';
import { AnswerServiceProvider } from '../providers/answer-service/answer-service';
import { EditAnswerPage } from "../pages/edit-answer/edit-answer";
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { EditProfilePage } from "../pages/edit-profile/edit-profile";

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
    MyQuestionsPage,
    LogoutPage,
    EditQuestionPage,
    EditAnswerPage,
    EditProfilePage
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
    MyQuestionsPage,
    LogoutPage,
    EditQuestionPage,
    EditAnswerPage,
    EditProfilePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppServiceProvider,
    PaginationServiceProvider,
    UserServiceProvider,
    ErrorServiceProvider,
    QuestionServiceProvider,
    AnswerServiceProvider,
    ProfileServiceProvider,
  ]
})
export class AppModule { }
