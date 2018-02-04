import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';


import { QuestionPage } from '../question/question';
import { QuestionServiceProvider } from '../../providers/question-service/question-service';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-edit-question',
  templateUrl: 'edit-question.html',
})
export class EditQuestionPage {
  public token: any;
  public question;
  public errormessage: string = "";
  public myQuestion: FormGroup;
  constructor(
    public navCtrl: NavController, public navParams: NavParams, private app: AppServiceProvider,
    public questionService: QuestionServiceProvider, private error :ErrorServiceProvider,
    private userService: UserServiceProvider, public viewCtrl: ViewController, public formbuilder: FormBuilder) {
    this.question = this.navParams.get('question');
    this.token = this.navParams.get('token');
    console.log(this.question);

    this.myQuestion = formbuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });

  }

  ionViewDidLoad() {
    // console.log(this.navParams.get('question'));
  }
  clicked() {
    this.viewCtrl.dismiss({ message: 'success' });
  }
  goBack() {
    this.viewCtrl.dismiss({ message: 'success' });
  }

  editQuestion(value) {
    this.app.showLoader('Wait your question is being published.');
    let uri = this.app.getUri() + '/questions/' + this.question.id;
    let payload = {
      "title": this.myQuestion.controls['title'].value,
      "content": this.myQuestion.controls['content'].value,
    };
    this.questionService.edit(uri, payload, this.token)
      .subscribe(
      questions => {},
      errors => {
        this.app.removeLoader();
        this.app.showToast(
          this.error.errorMessageIs(
            this.error.parseErrors(errors)
          ), 'top');
      },
      () => {
        this.app.removeLoader();
        this.app.showToast("Your question was updated successfully.",'top');
        this.viewCtrl.dismiss({message:"success"});
      });
  }
}
