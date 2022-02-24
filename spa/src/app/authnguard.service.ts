import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthnService } from "./authn.service";

@Injectable()
export class AuthnGuard implements CanActivate, CanActivateChild {
    constructor (private as: AuthnService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.as.hasValidSession().then(
            (validSession: boolean) => {
                if (validSession)
                    return true;
                else {
                    console.log("Not a valid sesion, redirect to login");
                    this.router.navigate(['/admin/login']);
                    return false;
                }
            }
        );
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    
}