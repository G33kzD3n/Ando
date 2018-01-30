import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { MenuPage } from '../menu/menu';
import { SignupPage } from '../signup/signup';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  public loader: any;
  public loginForm: FormGroup;
  public Message: any;
  public pageTitle: string;


  constructor(public navCtrl: NavController, public navParam: NavParams, public formbuilder: FormBuilder,
   private app: AppServiceProvider, private userService: UserServiceProvider, ) {
    this.loginForm = formbuilder.group({
      "email": ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  ionViewWillEnter(): void {
    this.pageTitle = "Login Here";
    this.Message = this.navParam.get('Message');
  }

  /**
   * @param {any} value input form values
   * Logs in authorised user to homePage
   * For unauthorised user prompts message at  login
   */
  onSubmit(value: any) {
    this.app.showLoader('Wait logging in..');
    let retData: any = '';
    let user: any;
    let payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.app.http.post(this.app.getUri() + '/login', payload, options)
      .map(res => res.json())
      .subscribe(
      result => {
        result;
        user = result.data;
        this.userService.setToken(user.api_token);
        this.userService.storage.set('id', user.id);
        this.userService.storage.set('username', user.user_name);
      },
      errors => {
        retData = JSON.parse(errors._body);
        console.log(retData);
        if (retData) {
          this.app.removeLoader();
          setTimeout(() => {
            this.app.showToast('The Email and password you entered didn\'t match our records', 'top');
          }, 100);
        }
      },
      () => {
        this.app.removeLoader();
        
        this.navCtrl.setRoot(MenuPage);
      }
      );
  }
  forgotPassword(): void {
    this.Message = "forgotPassword";
    console.log(this.Message);
  }

  registerUser(): void {
    this.navCtrl.push(SignupPage);
  }
}