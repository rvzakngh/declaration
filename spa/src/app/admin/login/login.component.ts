import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthnService } from 'src/app/authn.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm?: NgForm;
  submitted = false;

  constructor(private as: AuthnService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
      this.as.login(this.loginForm?.value.adminId, this.loginForm?.value.password).then(
        (success: boolean) => {
          if (success) {
            this.loginForm?.reset();
            this.submitted = false;
            this.router.navigate(['/admin/declarations']);
          }
        }
      );
  }

}
