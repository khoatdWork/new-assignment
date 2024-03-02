import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './add-question-dialog/add-question-dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilderService } from './form-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  questionFormArray: FormArray;

  constructor(private matDialog: MatDialog, private fb: FormBuilder,
    private formBuilderService: FormBuilderService,
    private router: Router) {
    this.questionFormArray = this.fb.array([
    ]);
  }

  ngOnInit() {
  }

  openAddQuestionDialog() {
    const _dialogRef = this.matDialog.open(AddQuestionDialogComponent, {
      width: "600px",
      height: "auto"
    });

    _dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questionFormArray.push(result);
      }
    })

  }

  questionForm(index: number): FormGroup {
    return this.questionFormArray.controls[index] as FormGroup;
  }

  listAnswer(index: number): FormArray {
    return (this.questionForm(index).controls)['listAnswer'] as FormArray;
  }

  listOfAnswer(index: number): FormArray {
    return (this.questionForm(index).controls)['answer'] as FormArray;
  }

  reviewAnswer() {
    this.formBuilderService.buildForm(this.questionFormArray.value);
    this.router.navigate(["form/answers"])
  }

  onListAnswerChange(event: any) {
    console.log(event);
  }

  onSelectOption(checkboxValue: string, formArrayIndex: number) {
    let answerList: Array<string> = [...this.listOfAnswer(formArrayIndex).value];
    const anserIndex: number = answerList.findIndex(f => f == checkboxValue);
    anserIndex == -1 ? answerList = [...answerList, checkboxValue] : answerList.splice(anserIndex, 1);

    this.listOfAnswer(formArrayIndex).clear();
    answerList.map(value => {
      this.listOfAnswer(formArrayIndex).push(this.fb.control(value));
    });
  }

  getAnsCbControl(formArayIndex: number, controlIndex: number): FormControl {
    return this.listOfAnswer(formArayIndex).controls[controlIndex] as FormControl;
  }

}
