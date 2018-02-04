import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserServiceProvider {
  loggedIn: boolean = false;
  private authToken: string;
  constructor(public storage: Storage) {
    this.authToken = null;
  }
  getApiToken() {
    return this.authToken;
  }
  setToken(token: string) {
    this.storage.set('token', token);
  }
  flushStorage() {
    this.storage.clear();
    this.authToken = null;
  }
  getToken() {
    let userToken = this.storage.get('token').then((value) => {
      return value;
    });
    return userToken = userToken;
  }
}
