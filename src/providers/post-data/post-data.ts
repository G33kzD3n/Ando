import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PostDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PostDataProvider Provider');
  }
  getPosts(){
    
  }
}
