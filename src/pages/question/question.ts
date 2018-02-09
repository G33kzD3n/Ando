import 'rxjs/add/operator/map';
import { Http} from "@angular/http";
import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EditQuestionPage } from '../edit-question/edit-question';
import { ErrorServiceProvider } from '../../providers/error-service/error-service';
import { AnswerServiceProvider } from '../../providers/answer-service/answer-service';
import { QuestionServiceProvider } from '../../providers/question-service/question-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EditAnswerPage } from "../edit-answer/edit-answer";
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Injectable()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  username: any;
  public enableDeleteQuestion: boolean = false;
  public enableEditQuestion: boolean = false;
  public enableComment: boolean = false;
  public question: any = "";
  public answerText: FormGroup;
  public data: any;
  public errormessage: string = "";

  constructor(
    public answerService: AnswerServiceProvider, public questionService: QuestionServiceProvider,
    public error: ErrorServiceProvider, private app: AppServiceProvider,
    private userService:UserServiceProvider,
    private http: Http, public modalCtrl: ModalController, private alertCtrl: AlertController, public formbuilder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {

    this.answerText = formbuilder.group({
      "answer": ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    this.load();
    this.userService.storage.get('username').then((value) => {
      setTimeout(() => {
        this.username = value;
      }, 80);
    });
  }
  /**
   * Edit a the question .
   * @param question any
   */
  editQuestion(question: any) {
    let modal = this.modalCtrl.create(
      EditQuestionPage, {
        question: question,
        token: this.navParams.get('token')
      });
    modal.present();
    modal.onDidDismiss(message => {
      setTimeout(() => {
        this.app.showToast('Please go back to home page and pull down to refresh..', 'top');
      }, 800);
      this.load();
    });
  }
  /**
   * Edit a the Answer .
   * @param answer any
   */
  editAnswer(answer: any) {
    let modal = this.modalCtrl.create(
      EditAnswerPage, {
        question: this.question,
        answer: answer,
        token: this.navParams.get('token')
      });
    modal.present();
    modal.onDidDismiss(message => {
      console.log(message);
      setTimeout(() => {
        this.app.showToast('Please go back to refresh..', 'top');
      }, 800);
    });
  }

  /**
   * Post an answer on a question.
   * @param value string
   */
  publishAnswer(value: string) {
    this.app.showLoader('Wait your answer is being posted...');
    let payload = {
      'content': this.answerText.controls['answer'].value
    };
    this.answerService.store(this.app.getPageUri(), payload, this.navParams.get('token'))
      .subscribe(
      result => { console.log(result); },
      errors => {
        this.app.removeLoader();
        this.app.showToast(this.error.errorMessageIs(this.error.parseErrors(errors)), 'top');
        console.log(errors);
      },
      () => {
        this.app.removeLoader();
        this.app.showToast('Answer posted successfully!', 'top');
        this.navCtrl.pop();
      });
  }
  /**
   * Delete Question
   * @param question any
   */
  deleteQuestion(question: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete the question?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.app.showLoader('Wait your question is being removed...');
            this.questionService.delete(this.app.getPageUri(), this.navParams.get('token'))
              .subscribe(
              result => { console.log(result); },
              errors => {
                this.app.removeLoader();
                this.app.showToast(this.error.errorMessageIs(this.error.parseErrors(errors)), 'top');
                console.log(errors);
              },
              () => {
                this.app.removeLoader();
                this.app.showToast('Question removed successfully!', 'top');
                this.navCtrl.pop();
              });
          }
        }
      ]
    });
    alert.present();

  }
  /**
  * Delete Question
  * @param answer any
  */
  deleteAnswer(answer: any) {
    let alert = this.alertCtrl.create({
      title: 'Delete Answer',
      message: 'You\'re about to delete this conversation.You can\'t undo the action.\n \n Are You Sure you want to continue',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.app.showLoader('Wait your question is being removed...');
            let uri = this.app.getPageUri() + '/answers/' + answer.answer_id;
            this.answerService.delete(uri, this.navParams.get('token'))
              .subscribe(
              result => { console.log(result); },
              errors => {
                this.app.removeLoader();
                this.app.showToast(this.error.errorMessageIs(this.error.parseErrors(errors)), 'top');
                console.log(errors);
              },
              () => {
                this.app.removeLoader();
                this.app.showToast('Answer removed successfully!', 'top');
                this.navCtrl.pop();
              });
          }
        }
      ]
    });
    alert.present();

  }


  public load() {
    this.http.get(this.app.getPageUri())
      .map(res => res.json())
      .subscribe(result => {
        this.question = result.data;
      });
  }
}
