import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../form-builder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preview-answer',
  templateUrl: './preview-answer.component.html',
  styleUrls: ['./preview-answer.component.scss']
})
export class PreviewAnswerComponent implements OnInit {

  form: Observable<any>;

  constructor(private formBuilderService: FormBuilderService) {
    this.form = this.formBuilderService.formBuilder;
  }

  ngOnInit() {
  }

}
