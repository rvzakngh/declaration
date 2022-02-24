import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { Declaration } from "./declaration.model";

@Injectable()
export class DeclarationService {
    private urlPrefix: string = "https://declaration.cacao.family/decl/api";

    constructor(private http: HttpClient) {}


    listAll(): Promise<Declaration[]> {
        const promise = new Promise<Declaration[]>(
            (resolve, reject) => {
                this.http.get<[{username:string, temperature:number, hasSymptoms: boolean, isCloseContact:boolean, submittedDate:number}]>(this.urlPrefix+"/declaration/list-all-db")
                .subscribe(
                    decls => {
                        const result:Declaration[] = [];
                        decls.forEach(decl => {
                            result.push(new Declaration(new Date(decl.submittedDate),decl.username,decl.temperature, decl.hasSymptoms, decl.isCloseContact));
                        });

                        resolve(result.sort((a, b) => a.submittedDate.getTime() === b.submittedDate.getTime() ? 0 : a.submittedDate.getTime()>b.submittedDate.getTime() ? -1 : 1));
                    }
                );
                
                // resolve([
                //     new Declaration(new Date(), "Test 1", 38, true, false),
                //     new Declaration(new Date(), "Test 2", 36, false, false),
                //     new Declaration(new Date(), "Test 3", 37, false, false),
                //     new Declaration(new Date(), "Test 4", 36, true, false),
                //     new Declaration(new Date(), "Test 5", 38, true, true),
                // ]);
            }
        );
        return promise;
    }
    submit(form: {username:string, temperature: number, hasSymptoms: boolean, isCloseContact: boolean}): Promise<Declaration> {
        const promise = new Promise<Declaration>(
            (resolve, reject) => {
                
                let params =  new HttpParams({
                    fromObject: {username: form.username, temperature: ""+form.temperature, symptoms: form.hasSymptoms, closecontact: form.isCloseContact }
                })
                this.http.post<{username:string, temperature:number, hasSymptoms: boolean, isCloseContact:boolean, submittedDate:number}>(this.urlPrefix+"/declaration/submit-db",params)
                .subscribe(
                    decl => {
                        resolve(new Declaration(new Date(decl.submittedDate),decl.username,decl.temperature, decl.hasSymptoms, decl.isCloseContact));
                    }
                );
                // const decl = new Declaration(new Date(), form.username, form.temperature, form.hasSymptoms, form.isCloseContact);
                // resolve(decl);
            }
        );
        return promise;
    }
}