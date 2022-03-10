import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNegocioComponent } from './ruta-negocio.component';

describe('RutaNegocioComponent', () => {
  let component: RutaNegocioComponent;
  let fixture: ComponentFixture<RutaNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
