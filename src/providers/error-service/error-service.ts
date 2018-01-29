import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorServiceProvider {
  constructor(public http: HttpClient) {
    console.log('Hello ErrorServiceProvider Provider');
  }
  parseError(errors:any){
    if(errors.status===0){
      return "Status_Is_Zero";
    }
  }
}
