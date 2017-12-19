import { Component ,} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public pageTitle  : string;


  constructor(private navParam : NavParams)
  { 
    this.pageTitle = this.navParam.get('pageTitle');
  }
  
}