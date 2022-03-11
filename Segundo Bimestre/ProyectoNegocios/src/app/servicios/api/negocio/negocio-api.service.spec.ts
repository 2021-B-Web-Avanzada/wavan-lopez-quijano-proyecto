import { TestBed } from '@angular/core/testing';

import { NegocioAPIService } from './negocio-api.service';

describe('ApiService', () => {
  let service: NegocioAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegocioAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
