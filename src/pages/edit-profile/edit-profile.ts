import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
@Injectable()
@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public myProfile: FormGroup;
  public token: string = "";
  public user: any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public app: AppServiceProvider,
    public formbuilder: FormBuilder, public profileService: ProfileServiceProvider, private error: ErrorServiceProvider,
  ) {
    this.myProfile = formbuilder.group({
      "name": ['', Validators.compose([Validators.required])],
    });
    this.user = this.navParams.get('user');
    this.token = this.navParams.get('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  goBack() {
    this.viewCtrl.dismiss({ message: 'success' });
  }
  editProfile(value) {
    this.app.showLoader('Wait your profile is being updated.');
   let url = this.app.getUri() + '/users/' + this.user.username;
    let payload = {
      "name": this.myProfile.controls['name'].value,
    };
    this.profileService.editProfile(url, payload, this.token)
      .subscribe(
       result=> {
         console.log(result);
        },
      errors => {
        this.app.removeLoader();
        this.app.showToast(
          this.error.errorMessageIs(
            this.error.parseErrors(errors)
          ), 'top');
      },
      () => {
        this.app.removeLoader();
        this.app.showToast("Your Profile was updated successfully.", 'top');
        this.viewCtrl.dismiss({ message: "success" });
      });
  }
}
