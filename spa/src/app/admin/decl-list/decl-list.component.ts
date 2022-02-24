import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthnService } from 'src/app/authn.service';
import { Declaration } from 'src/app/declaration.model';
import { DeclarationService } from 'src/app/declaration.service';

@Component({
  selector: 'app-decl-list',
  templateUrl: './decl-list.component.html',
  styleUrls: ['./decl-list.component.css']
})
export class DeclListComponent implements OnInit {
  declarations: Declaration[] = [];
  isRefreshing = false;
  
  constructor(private ds: DeclarationService, private as: AuthnService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: Data) => {
        this.declarations = data['declarations'];
      }
    )
  }
  onRefresh() {
    this.isRefreshing = true;
    this.ds.listAll().then(
      (value: Declaration[]) => {
        this.declarations = value;
        this.isRefreshing = false;
      }
    )
  }
  onLogout() {
    this.as.logout().then(
      () => {
        this.router.navigate(['../login'], {relativeTo: this.route});   
      }
    )
  }
}
