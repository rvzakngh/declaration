import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DeclListComponent } from './admin/decl-list/decl-list.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthnGuard } from './authnguard.service';
import { DeclarationsResolver } from './declaration-resolver.service';
import { FormNewComponent } from './form/form-new/form-new.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'declarations', component: DeclListComponent, canActivate: [AuthnGuard], resolve: {declarations: DeclarationsResolver}},
    { path: '', pathMatch: 'full', redirectTo: 'declarations'}
  ] },
  { path: '**', redirectTo: '/form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
