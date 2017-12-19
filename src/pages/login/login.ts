import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MenuPage } from '../menu/menu';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  users = [{
    id: 1,
    name: "Nadeem",
    email: "nadeem@gmail.com",
    mobileNo: 9018556691,
    password: "stranger"
  },
  {
    id: 2,
    name: "Sami",
    email: "sami@gmail.com",
    mobileNo: 9018556691,
    password: "stranger"
    
  },
  {
    id: 3,
    name: "Owais",
    email: "owais@gmail.com",
    mobileNo: 9018556691,
    password: "stranger"
  }
];
  public loginForm : FormGroup;
  public Message   : any;
  public pageTitle : string;
  public userName  : string;

  constructor(public navCtrl : NavController, public navParam : NavParams, public formbuilder : FormBuilder)
    {
      this.loginForm = formbuilder.group({
        "email"     : ['',Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
          "password"  : ['',Validators.compose([
            Validators.required,
            Validators.minLength(8)
          ])], 
        });
    }
      
  ionViewWillEnter(): void {
    this.pageTitle = "Login Here";
    this.Message = this.navParam.get('Message');
  }
  /**
   * @param {any} user  is a object recieved from form .
   * @returns A boolean response , True if user found, else default value.
   */
  public isUserFound(user:any) {
    var UserFound: boolean = false;
    this.users.forEach(obj => {
      if (obj.email === user.email  && obj.password === user.password) {
        UserFound = true;
        return UserFound;
      }
    });
    return UserFound; //default value returned
  } 
      
  /**
   * @param {any} value input form values 
   * Logs in authorised user to homePage 
   * For unauthorised user prompts message at  login
   */
  onSubmit(value : any ){ 
    let user = {
      email    : this.loginForm.controls['email'].value,
      password : this.loginForm.controls['password'].value
    };   
    if ( this.isUserFound(user) ){
      this.userName = this.getUserName(user.email);
      this.navCtrl.push(MenuPage ,{
        pageTitle : "Home",
        userName : this.userName
      });
    }
    else{
      this.navCtrl.setRoot(LoginPage,{
        Message : "*Email/Password incorrect."
      });
    }
  }
  
  forgotPassword() : void {
    this.Message = "forgotPassword";
    console.log(this.Message);
  }

  registerUser() : void {
    this.navCtrl.push(SignupPage);
  }
        
  /**
   * @param {string} key usually email , 
   * matches the key in users and returns the username of the record whose key matched
   */
  public getUserName(key : any){
    let name : string  ="";  
    this.users.forEach( user => {
      if(user.email === key){
        return name=user.name;
      }
    });
    return name;
  }
}