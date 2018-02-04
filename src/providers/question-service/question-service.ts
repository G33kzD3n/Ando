import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class QuestionServiceProvider {
  constructor(public http: Http) {
    console.log('Hello QuestionServiceProvider Provider');
  }
  /**
   * Create a new question
   * @param uri string
   * @param data any
   * @param token string
   */
  store(uri: string, data: any, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    console.log('the data is');
    return this.http.post(uri, data, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }
  /**
   * Edit question
   * @param uri string
   * @param data any
   * @param token string
   */
  edit(uri: string, data: any, token: string): Observable<any> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', 'Bearer ' + token);
      console.log('the data is');
      return this.http.put(uri, data, { headers: headers })
        .map(res => res.json())
        .catch ((errors: any) => Observable.throw(errors));
  }
 
  /**
  * Delete Question
  * @param uri string
  * @param token string
  */
  delete(uri: string, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.delete(uri, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }
}
  


