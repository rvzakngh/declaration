import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DeclarationService } from "./declaration.service";
import { TestBed } from '@angular/core/testing';

describe('DeclarationService', () => {
    let service: DeclarationService;
    let httpClient: HttpClient;
    beforeEach(() => { 
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [HttpClient]
          });
        httpClient = TestBed.get(HttpClient);
        service = new DeclarationService(httpClient) 
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