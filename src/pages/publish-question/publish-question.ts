import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-publish-question',
  templateUrl: 'publish-question.html',
})
export class PublishQuestionPage {
  public myQuestion: FormGroup;
  public errormessage: string = "";
  constructor(
    public formbuilder: FormBuilder, private userService: UserServiceProvider,
    private app: AppServiceProvider, private http: Http,
    public navCtrl: NavController, public navParams: NavParams) {
    this.myQuestion = formbuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.app.setPageUri('/questions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishQuestionPage');
  }
  publishQuestion(value: any) {
    this.app.showLoader('Wait your question is being published.');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + this.userService.getApiToken());
    let payload = {
      title: this.myQuestion.controls['title'].value,
      conten: this.myQuestion.controls['content'].value
    };
    let uri = this.app.getPageUri();
    this.http.post(uri, payload, { headers: headers })
      .map(res => res.json())
      .subscribe(
        result => {
        },

        errors => {
          this.app.removeLoader(2000);
          if (errors.status == 0) {
            this.app.showToast('Something went wrong', 'top', 2500);
          } else {
            this.errormessage = errors._body.error_message;
            this.app.showToast(this.errormessage, 'top', 2500);
            console.log(this.errormessage);
          }
        },

        () => {
          this.app.removeLoader(2000);
          this.app.showToast('Your question has been posted successfully.', 'top', 2500);
          console.log('success');
        }
      );
  }
}
