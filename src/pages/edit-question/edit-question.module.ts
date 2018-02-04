import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditQuestionPage } from './edit-question';


@NgModule({
  declarations: [
    EditQuestionPage
  ],
  imports: [
    IonicPageModule.forChild(EditQuestionPage),
  ],
})
export class EditQuestionPageModule {}
