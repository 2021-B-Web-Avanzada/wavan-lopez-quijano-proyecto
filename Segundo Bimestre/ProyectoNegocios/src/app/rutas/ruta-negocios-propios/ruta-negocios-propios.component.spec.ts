import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaNegociosPropiosComponent } from './ruta-negocios-propios.component';

describe('RutaNegociosPropiosComponent', () => {
  let component: RutaNegociosPropiosComponent;
  let fixture: ComponentFixture<RutaNegociosPropiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaNegociosPropiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaNegociosPropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
