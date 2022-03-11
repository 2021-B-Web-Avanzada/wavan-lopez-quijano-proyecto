import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegistrarseComponent } from './ruta-registrarse.component';

describe('RutaRegistrarseComponent', () => {
  let component: RutaRegistrarseComponent;
  let fixture: ComponentFixture<RutaRegistrarseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRegistrarseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegistrarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
