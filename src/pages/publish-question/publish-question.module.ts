import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishQuestionPage } from './publish-question';

@NgModule({
  declarations: [
    PublishQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishQuestionPage),
  ],
})
export class PublishQuestionPageModule {}
