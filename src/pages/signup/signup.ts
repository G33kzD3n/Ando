import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    pageTitle  : string;
    regForm    : FormGroup;

  constructor(public navCtrl: NavController, public navParam: NavParams, public formbuilder : FormBuilder ) {
     this.regForm = this.formbuilder.group({
        "name"               : ['', Validators.compose( [
                                    Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(10),
                                    Validators.pattern(/[a-zA-Z][a-zA-Z]+/)])],
        "email"              : ['', Validators.compose( [
                                    Validators.required,
                                    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ )] )],
        "mobileNo"           : ['', Validators.compose( [
                                    Validators.required,
                                    Validators.minLength(10),
                                    Validators.maxLength(10),
                                    Validators.pattern(/[0-9]*/ )] )],
       "password"           : ['',  Validators.compose([
                                    Validators.required,
                                    Validators.minLength(8),
                                    Validators.maxLength(10),
                                  // Validators.pattern(/[0-9]*/)
                                ])],
       "confirmPassword"    : ['', Validators.compose([
                                   Validators.required,
                                   Validators.minLength(8),
                                   Validators.maxLength(10),
                                    // Validators.pattern(/[0-9]*/)
                                  ])],
      });
  }

  onRegister(regForm : FormGroup){
    console.log(regForm);
  }

}
