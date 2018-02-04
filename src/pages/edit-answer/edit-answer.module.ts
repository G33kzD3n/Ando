import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAnswerPage } from './edit-answer';

@NgModule({
  declarations: [
    EditAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAnswerPage),
  ],
})
export class EditAnswerPageModule {}
