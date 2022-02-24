import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormNewComponent } from './form/form-new/form-new.component';
import { FormViewComponent } from './form/form-view/form-view.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { DeclListComponent } from './admin/decl-list/decl-list.component';
import { EntryComponent } from './admin/decl-list/entry/entry.component';
import { FormsModule } from '@angular/forms';
import { AuthnService } from './authn.service';
import { AuthnGuard } from './authnguard.service';
import { DeclarationService } from './declaration.service';
import { DeclarationsResolver } from './declaration-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormNewComponent,
    FormViewComponent,
    AdminComponent,
    LoginComponent,
    DeclListComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthnService, AuthnGuard, DeclarationService, DeclarationsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
