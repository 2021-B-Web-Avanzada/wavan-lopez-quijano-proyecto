import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEditarNegocioPropioComponent } from './ruta-editar-negocio-propio.component';

describe('RutaEditarNegocioPropioComponent', () => {
  let component: RutaEditarNegocioPropioComponent;
  let fixture: ComponentFixture<RutaEditarNegocioPropioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaEditarNegocioPropioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEditarNegocioPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
