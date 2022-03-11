import { TestBed } from '@angular/core/testing';

import { ComentarioAPIService } from './comentario-api.service';

describe('ComentarioApiService', () => {
  let service: ComentarioAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
