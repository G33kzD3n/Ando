import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyQuestionsPage } from './my-questions';

@NgModule({
  declarations: [
    MyQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyQuestionsPage),
  ],
})
export class MyQuestionsPageModule {}
