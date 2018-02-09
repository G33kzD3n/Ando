import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProfileServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  /**
   * Get user Profile by username.
   * @param uri string
   * @param token string
   */
  getProfile(uri: string, token: string = null): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
   // headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(uri,{ headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }

  /**
   * Edit profile
   * @param uri string
   * @param data any
   * @param token string
   */
  editProfile(uri: string, data: any, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.put(uri, data, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }

  // * Create a new question
  //   * @param uri string
  //     * @param data any
  //       * @param token string
  //         * /
  // store(uri: string, data: any, token: string): Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + token);
  //   console.log('the data is');
  //   return this.http.post(uri, data, { headers: headers })
  //     .map(res => res.json())
  //     .catch((errors: any) => Observable.throw(errors));
  // }
  

  // /**
  // * Delete Question
  // * @param uri string
  // * @param token string
  // */
  // delete(uri: string, token: string): Observable<any> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', 'Bearer ' + token);
  //   return this.http.delete(uri, { headers: headers })
  //     .map(res => res.json())
  //     .catch((errors: any) => Observable.throw(errors));
  // }
}
