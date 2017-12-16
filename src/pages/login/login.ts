import { Component , Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   @Input() userName;

    public loginForm                 : FormGroup;
    public Message                  : any;
    public pageTitle                : string;
    // Flag to hide the form upon successful completion of remote operation
    public hideMessage              : boolean = false;
    public hide                     : boolean = true;
    public userEmail                : string;
    public userPassword             : string;

  constructor(public navCtrl        : NavController,
              public navParams      : NavParams,
              public formbuilder    : FormBuilder)
  {
      this.loginForm = formbuilder.group({
         "email"                    : ["", Validators.required ],
         "password"                  : ["", Validators.required]
      });
  }

  onSubmit(value : any )
  {
    this.userEmail=this.loginForm.controls['email'].value;
    this.userPassword=this.loginForm.controls['password'].value;
    this.pageTitle="HomePage";
    this.navCtrl.setRoot(HomePage ,{
        pageTitle : this.pageTitle,
        userEmail :this.userEmail
    });
  }
  ionViewWillEnter(): void{
    this.pageTitle="new login";
    this.Message="";
  }
  forgotPassword() : void {
      this.Message = "forgotPassword";
    console.log(this.Message);
  }

  registerUser() : void {
    this.navCtrl.push(SignupPage,{
      'title' : "Sign" });
  }
}
