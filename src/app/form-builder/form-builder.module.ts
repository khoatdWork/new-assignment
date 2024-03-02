import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { FormBuilderComponent } from './form-builder.component';
import { PreviewAnswerComponent } from './preview-answer/preview-answer.component';


const routes: Routes = [
  {
    path: "",
    component: FormBuilderComponent
  },
  {
    path: "answers",
    component: PreviewAnswerComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormBuilderComponent, AddQuestionDialogComponent, PreviewAnswerComponent]
})
export class FormBuilderModule { }
