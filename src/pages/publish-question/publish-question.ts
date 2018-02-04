import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { QuestionServiceProvider } from '../../providers/question-service/question-service';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';

@IonicPage()
@Component({
  selector: 'page-publish-question',
  templateUrl: 'publish-question.html',
})
export class PublishQuestionPage {
  public myQuestion: FormGroup;
  public errormessage: string = "";
  constructor(
    private userService: UserServiceProvider, private questionService: QuestionServiceProvider,
    public error: ErrorServiceProvider, private app: AppServiceProvider, private http: Http,
    public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder) {
    this.myQuestion = formbuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
    this.app.setPageUri('/questions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublishQuestionPage');
  }
  /**
   * Create a new Question.
   * @param value any
   */
  publishQuestion(value: any) {
    this.app.showLoader('Wait your question is being published.');
    let payload = {
      title: this.myQuestion.controls['title'].value,
      content: this.myQuestion.controls['content'].value
    };
    let uri = this.app.getPageUri();
    this.questionService.store(uri, payload, this.navParams.get('token'))
      .map(res => res.json())
      .subscribe(
      result => {
      },
      errors => {
        this.app.removeLoader();
        //this.app.showToast(this.error.errorMessageIs(this.error.parseErrors(errors)), 'top');
      },
      () => {
        this.app.removeLoader();
        this.app.showToast('Your question has been posted successfully.', 'top');
        this.navCtrl.pop();
        console.log('success');
      }
      );
  }
}
