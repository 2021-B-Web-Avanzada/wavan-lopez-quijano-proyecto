import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAprobarNegociosComponent } from './ruta-aprobar-negocios.component';

describe('RutaAprobarNegociosComponent', () => {
  let component: RutaAprobarNegociosComponent;
  let fixture: ComponentFixture<RutaAprobarNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAprobarNegociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAprobarNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
