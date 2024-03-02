import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { startWith } from 'rxjs';

export interface QuestionType {
  name: string;
  value: string;
}

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent implements OnInit {
  questionType: QuestionType[] = [
    { name: "Paragraph", value: "P" },
    { name: "Checkbox List", value: "C" }
  ];

  questionForm: FormGroup;
  isAnswerRequired: boolean = false;
  isAllowOwnAnswer: boolean = false;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddQuestionDialogComponent>) {
    this.questionForm = this.questionTypeParagraph;
  }

  ngOnInit() {
    this.questionForm.controls?.['type'].valueChanges.subscribe(value => {
      if (!value) return;
      this.questionForm = value == "C" ? this.questionTypeCheckbox : this.questionTypeParagraph;
      this.isAllowOwnAnswer = false;
      this.isAnswerRequired = false;
    });

    this.questionForm.controls?.['listAnswer']?.valueChanges.subscribe(value => { 
      console.log(value);
    });

  }

  get questionTypeCheckbox(): FormGroup {
    return this.fb.group({
      type: this.fb.control("C", [Validators.required]),
      answer: this.fb.array([""]),
      listAnswer: this.fb.array([]),
      question: this.fb.control("", [Validators.required])
    })
  }

  get questionTypeParagraph(): FormGroup {
    return this.fb.group({
      type: this.fb.control("P", [Validators.required]),
      answer: this.fb.control(""),
      question: this.fb.control("", [Validators.required])
    })
  }

  get listAnswerFormArray(): FormArray {
    return this.questionForm.get("listAnswer") as FormArray;
  }

  get listAnswerResultFormArray(): FormArray {
    return this.questionForm.get("answer") as FormArray;
  }

  formArrayControl(index: number): FormControl { 
    return this.listAnswerFormArray.controls[index] as FormControl;
  }

  onAddAnotherAnswer() {
    this.listAnswerFormArray.push(this.fb.control(""));
    this.listAnswerResultFormArray.push(this.fb.control(""));
  }

  onRequiredChange(required: boolean) {
    this.questionForm.controls?.['answer'].clearValidators();
    if (required) {
      this.questionForm.controls?.['answer'].setValidators([Validators.required]);
    }
    this.questionForm.controls?.['answer'].updateValueAndValidity();
  }

  onSubmit() {
    // Should check if type answer is C => Checkbox list if it need to add "Other" option.
    if (this.isAllowOwnAnswer && this.questionForm.controls?.['type'].value == "C") {
      this.listAnswerFormArray.push(this.fb.control("Other"));
      this.listAnswerResultFormArray.push(this.fb.control(""));
    }

    this.dialogRef.close(this.questionForm);
  }

 

}
