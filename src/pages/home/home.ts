import { Component ,} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public pageTitle  : string;
  public posts      : any = [] ;


  constructor(private navParam : NavParams , private http : Http)
  {
    this.pageTitle = this.navParam.get('pageTitle');
  }

  ionViewWillEnter() {
    this.load();
  }
    load(){
      this.http.get('http://myapp.dev/index.php')
      .map(res => res.json())
      .subscribe(data => {
          this.posts =data;
          console.log(data);

        });
    }
}