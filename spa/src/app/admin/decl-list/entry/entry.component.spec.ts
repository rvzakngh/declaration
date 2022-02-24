import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Declaration } from 'src/app/declaration.model';

import { EntryComponent } from './entry.component';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('binding to declaration and rendered as expected', () => {
    component.declaration = new Declaration(new Date(), "Bob", 38.5, true, true);
    fixture.detectChanges();
    const entryDe: DebugElement = fixture.debugElement;
    const entryEl: HTMLElement = entryDe.nativeElement;
    const tds = entryEl.querySelectorAll('td')!;
    expect(tds[1].textContent).toEqual("Bob");
    expect(tds[2].textContent).toEqual("38.5");
    expect(tds[3].textContent).toEqual("Yes");
    expect(tds[4].textContent).toEqual("Yes");
  });

});
