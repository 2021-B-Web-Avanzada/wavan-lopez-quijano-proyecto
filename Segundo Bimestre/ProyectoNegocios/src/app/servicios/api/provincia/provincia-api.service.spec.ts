import { TestBed } from '@angular/core/testing';

import { ProvinciaAPIService } from './provincia-api.service';

describe('ProvinciaApiService', () => {
  let service: ProvinciaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
