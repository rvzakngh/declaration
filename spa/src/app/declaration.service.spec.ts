import { HttpClient } from "@angular/common/http";
import { AuthnService } from "./authn.service";
import { DeclarationService } from "./declaration.service";

describe('DeclarationService', () => {
    let service: DeclarationService;
    let http: HttpClient;
    beforeEach(() => { service = new DeclarationService(http) });

    it('#submit should return the same data and submitted date', 
        (done: DoneFn) => {
            service.submit({username: 'Boba', temperature: 37.5, hasSymptoms: true, isCloseContact: true}).then(
                declaration => {
                    expect(declaration).toBeDefined();
                    expect(declaration.submittedDate).toBeDefined();
                    expect(declaration.username).toBe('Boba');
                    expect(declaration.temperature).toBe(37.5);
                    expect(declaration.hasSymptoms).toBeTrue();
                    expect(declaration.isCloseContact).toBeTrue();
                    done();
                }
            );
    });


    it('#listAll should return some data', 
        (done: DoneFn) => {
            service.listAll().then(
                declarations => {
                    expect(declarations).toBeDefined();
                    expect(declarations.length).toBeGreaterThan(0);
                    done();
                }
            );
    });
});