import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaMapaComponent } from './ruta-mapa.component';

describe('RutaMapaComponent', () => {
  let component: RutaMapaComponent;
  let fixture: ComponentFixture<RutaMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
