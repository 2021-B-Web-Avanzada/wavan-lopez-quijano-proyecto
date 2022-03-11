import { TestBed } from '@angular/core/testing';

import { UsuarioAPIService } from './usuario-api.service';

describe('UsuarioApiService', () => {
  let service: UsuarioAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
