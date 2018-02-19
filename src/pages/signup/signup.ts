import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Http, RequestOptions } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { MenuPage } from '../menu/menu';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public user: any;
  pageTitle: string;
  regForm: FormGroup;

  constructor(public http: Http, public app: AppServiceProvider, public userService: UserServiceProvider,
    public navCtrl: NavController, public navParam: NavParams, public formbuilder: FormBuilder) {
    this.regForm = this.formbuilder.group({
      "name": ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
        Validators.pattern(/[a-zA-Z][a-zA-Z]+/)])],
      "email": ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      "username": ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ])],
      "password": ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern(/[0-9]*/)
      ])],
      "confirmPassword": ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern(/[0-9]*/)
      ])],
    });
  }

  onRegister(regForm: FormGroup) {

    let payload = {
      email: this.regForm.controls['email'].value,
      password: this.regForm.controls['password'].value,
      name: this.regForm.controls['name'].value,
      user_name: this.regForm.controls['username'].value,
    };
    this.app.showLoader('Wait signing in..');
    this.app.http.post(this.app.getUri() + '/register', payload)
      .map(res => res.json())
      .subscribe(
        result => {
          console.log(result);
          this.user = result.data;
          this.userService.setToken(this.user.api_token);
          this.userService.storage.set('id', this.user.id);
          this.userService.storage.set('username', this.user.user_name);
        },
        errors => {
          this.app.removeLoader();
          let retData = JSON.parse(errors._body);
          this.app.showToast(this.parseErrors(retData.errors.email), 'top');
        },
        () => {
          this.app.removeLoader();
          setTimeout(() => {
            this.app.showToast('Thanks for signinng up.. Enjoy', 'top');
            this.navCtrl.setRoot(MenuPage, { token: this.user.api_token });
          }, 3000);
          console.log('success');
        }
      );
  }
  parseErrors(errors) {
    // if (errors.user_name)
    //   return errors.user_name;
    if (errors.email) {
      return errors.email;
    }
    if (errors.password) {
      return errors.password;
    }
  }
}