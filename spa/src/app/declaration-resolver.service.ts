import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Declaration } from "./declaration.model";
import { DeclarationService } from "./declaration.service";

@Injectable()
export class DeclarationsResolver implements Resolve<Declaration[]> {
    constructor(private ds: DeclarationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Declaration[] | Observable<Declaration[]> | Promise<Declaration[]> {
        return this.ds.listAll().then(
            (value: Declaration[]) => {
                return value;
            }
        );
    }
}