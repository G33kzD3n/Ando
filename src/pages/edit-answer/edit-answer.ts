import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AnswerServiceProvider } from '../../providers/answer-service/answer-service';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';
import { AppServiceProvider } from '../../providers/app-service/app-service';

@Injectable()
@IonicPage()
@Component({
  selector: 'page-edit-answer',
  templateUrl: 'edit-answer.html',
})
export class EditAnswerPage {
  public question: any;
  public token: any;
  public answer: any;
  public myAnswer: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: AppServiceProvider,
    public formbuilder: FormBuilder, public answerService: AnswerServiceProvider, private error: ErrorServiceProvider,
    public viewCtrl: ViewController,
  ) {
    this.question = this.navParams.get('question');
    this.token = this.navParams.get('token');
    this.answer = this.navParams.get('answer');
    this.myAnswer = formbuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    });
  }

  ionViewDidLoad() {
    console.log(this.token);
  }
  clicked() {
    this.viewCtrl.dismiss({ message: 'success' });
  }
  goBack() {
    this.viewCtrl.dismiss({ message: 'success' });
  }

  editAnswer(value) {
    this.app.showLoader('Wait your Answer is being published.');
    let uri = this.app.getUri() + '/questions/' + this.question.id + '/answers/' + this.answer.answer_id;
    let payload = {
      "content": this.myAnswer.controls['content'].value,
    };
    this.answerService.edit(uri, payload, this.token)
      .subscribe(
      questions => { },
      errors => {
        this.app.removeLoader();
        this.app.showToast(
          this.error.errorMessageIs(
            this.error.parseErrors(errors)
          ), 'top');
      },
      () => {
        this.app.removeLoader();
        this.app.showToast("Your Answer was updated successfully.", 'top');
        this.viewCtrl.dismiss({ message: "success" });
      });
  }
}
