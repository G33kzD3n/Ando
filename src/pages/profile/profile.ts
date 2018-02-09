import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { EditProfilePage } from '../edit-profile/edit-profile';
@Injectable()
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public username: any;
  public pageTitle: string;
  public user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private profileService: ProfileServiceProvider, private app: AppServiceProvider,
    private error: ErrorServiceProvider, private userService: UserServiceProvider,
    public modalCtrl: ModalController,
  ) {
    this.pageTitle = "Profile ";
    this.user = "";
    this.username = "";
  }
  ionViewDidLoad() {
    this.userService.storage.get('username')
      .then((username) => {
        this.username = username;
        if (!this.navParams.get('username') || this.navParams.get('username') === this.username) {
          this.showProfile(username);
          console.log(username);
        }
        else {
          this.showProfile(this.navParams.get('username'));
        }
      });
  }

  showProfile(username: string) {
    this.app.showLoader('Loading your profile...');
    let uri = this.app.getUri() + '/users/' + username;
    this.profileService.getProfile(uri)
      .subscribe(
      result => {
        this.user = result.data;
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
      });
  }
  editProfile(user) {
    this.userService.storage.get('token').then((token) => {
      let modal = this.modalCtrl.create(
        EditProfilePage, { user: user, token: token });
      modal.present();
      modal.onDidDismiss(message => {
        setTimeout(() => {
          this.app.showToast('Please go back to home page and pull down to refresh..', 'top');
        }, 800);
      });
    });
  }
}
