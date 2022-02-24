import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Declaration } from 'src/app/declaration.model';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  @Input() declaration?: Declaration;
  @Output() submitNew = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }
  onNew() {
    console.log("on new");
    this.submitNew.emit();
  }

}
