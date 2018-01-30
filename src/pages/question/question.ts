import 'rxjs/add/operator/map';
import { Http, Headers } from "@angular/http";
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
@Injectable()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  public question: any = "";
  public answerText: FormGroup;
  public publishAnswerButtonName: string = "Post";
  public data: any;
  public enableComment: any = false;
  public errormessage: string = "";
  constructor(
    public formbuilder: FormBuilder, private userService: UserServiceProvider,
    private app: AppServiceProvider, private http: Http,
    public navCtrl: NavController, public navParams: NavParams) {

    this.answerText = formbuilder.group({
      "answer": ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('inside the question detail page' + this.userService.getApiToken());
    if (this.userService.isLoggedIn() == true) {
      this.enableComment = true;
    }
    this.load();
  }
  publish(value: string) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.userService.getApiToken() });
    // this.options = this.app.options;
    if (this.publishAnswerButtonName === 'Post') {
      let payload = {
        'content': this.answerText.controls['answer'].value
      };
      let uri = this.app.getUri() + '/questions/' + this.question.id;
      this.http.post(uri, payload, { headers: headers })
        .map(res => res.json())
        .subscribe(
        result => {
          console.log(result);
        },
        errors => {
          let errormessage = JSON.parse(errors._body);
          this.errormessage = errormessage[0].errors.error_message.content[0];
          this.app.showToast(this.errormessage, 'top');
          //console.log(errormessage[0].errors.error_message.content[0]);
        },
        () => {
          this.app.showToast('Answer posted successfully!', 'top');
          this.refresh();
        }
        );
    }
  }
  refresh() {
    this.navCtrl.pop();
  }
  load() {
    this.http.get(this.app.getPageUri())
      .map(res => res.json())
      .subscribe(res => {
        this.question = res[0].data;
      });
  }

}
