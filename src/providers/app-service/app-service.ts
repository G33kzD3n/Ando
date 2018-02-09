import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppServiceProvider {
  private homePageTitle: string = "Dialogue";
  private baseUri: string = "http://192.168.225.108:8000/api/1.0";
  private pageUri: string = "";
  public loader: any;
  public options: any;

  constructor(public http: Http, private toastCtrl: ToastController, 
    public storage: Storage, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: ''
    });

  }
  getUri() {
    return this.baseUri;
  }
  setPageUri(Uri: string) {
    this.pageUri = this.getUri() + Uri;
  }
  getPageUri() {
    return this.pageUri;
  }
  getHomePageTitle() {
    return this.homePageTitle;
  }
  getOptions() {
    return this.options;
  }
  showToast(data: string, position: string,delay:number=0) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: position,
      cssClass: 'mytoast'
    });
    setTimeout(() => {
      toast.present();
    }, delay);

  }
  showLoader(message: string) {
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }
  removeLoader(timmer:number=0){
    setTimeout(() => {   
      this.loader.dismiss();
    }, timmer);
  
  }

  
}
