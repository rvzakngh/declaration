import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthnService } from 'src/app/authn.service';
import { DeclarationService } from 'src/app/declaration.service';

import { DeclListComponent } from './decl-list.component';

describe('DeclListComponent', () => {
  let component: DeclListComponent;
  let fixture: ComponentFixture<DeclListComponent>;
  let ds: DeclarationService;
  let as: AuthnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ AuthnService, DeclarationService ],
      declarations: [ DeclListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthnService, DeclarationService ],
    });
    as = TestBed.inject(AuthnService);
    ds = TestBed.inject(DeclarationService);
    fixture = TestBed.createComponent(DeclListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
