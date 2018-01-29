import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PaginationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaginationServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaginationServiceProvider Provider');
  }

}
