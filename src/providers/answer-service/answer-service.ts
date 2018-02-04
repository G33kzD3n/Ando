import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Injectable()
export class AnswerServiceProvider {

  constructor(private http: Http) {
    console.log('Hello AnswerServiceProvider Provider');
  }
  /**
   * Store an Answer
   * @param uri 
   * @param data 
   * @param token 
   */
  store(uri: string, data: any, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.post(uri, data, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }
  /**
  * Edit an Answer
  * @param uri 
  * @param data 
  * @param token 
  */
  edit(uri: string, data: any, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.patch(uri, data, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }

  /**
  * Delete an Answer
  * @param uri 
  * @param data 
  * @param token 
  */
  delete(uri: string, token: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.delete(uri, { headers: headers })
      .map(res => res.json())
      .catch((errors: any) => Observable.throw(errors));
  }

  
}
