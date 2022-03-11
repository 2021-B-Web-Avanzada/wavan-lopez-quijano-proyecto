import { TestBed } from '@angular/core/testing';

import { CategoriaAPIService } from './categoria-api.service';

describe('CategoriaApiService', () => {
  let service: CategoriaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
