import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Declaration } from 'src/app/declaration.model';
import { DeclarationService } from 'src/app/declaration.service';

@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.css']
})
export class FormNewComponent implements OnInit {
  @ViewChild('f') declForm?: NgForm;
  @Output() onSubmitted = new EventEmitter<Declaration>();
  isSubmitting: boolean = false;

  yesno: string[] = ['Yes', 'No'];
  declaration = {
    username: "",
    temperature: 0,
    hasSymptoms: false,
    isCloseContact: false
  }

  constructor(private ds: DeclarationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitting = true;
    this.declaration.username = this.declForm?.value.username;
    this.declaration.temperature = this.declForm?.value.temperature;
    this.declaration.hasSymptoms = this.declForm?.value.symptoms === 'Yes';
    this.declaration.isCloseContact = this.declForm?.value.closecontact === 'Yes';
    this.declForm?.reset();
    this.ds.submit(this.declaration).then(
      decl => {
        setTimeout(() => {
          this.onSubmitted.emit(decl);
          this.isSubmitting = false;
        }, 2000);
      }
    );
  }

}
