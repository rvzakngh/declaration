import { Component, Input, OnInit } from '@angular/core';
import { Declaration } from 'src/app/declaration.model';

@Component({
  selector: '[app-entry]',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() declaration?: Declaration;

  constructor() { }

  ngOnInit(): void {
  }

}
