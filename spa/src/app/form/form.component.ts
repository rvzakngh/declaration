import { Component, OnInit } from '@angular/core';
import { Declaration } from '../declaration.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  declaration?: Declaration;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitted(event: Declaration) {
    console.log(event);
    this.declaration = event;
  }
  onNew() {
    delete this.declaration;
  }
}
