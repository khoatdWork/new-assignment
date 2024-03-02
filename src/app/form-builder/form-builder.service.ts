import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "platform"
})

export class FormBuilderService {

  private subject = new BehaviorSubject<any>(null);
  public formBuilder: Observable<any> = this.subject.asObservable();

  buildForm(form: any) {
    this.subject.next(form);
  }

}