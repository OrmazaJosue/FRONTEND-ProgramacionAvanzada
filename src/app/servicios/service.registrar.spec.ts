import { TestBed } from '@angular/core/testing';
import { Cargar } from './cargar';

describe('Cargar', () => {
  let service: Cargar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cargar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
//// aqui falta preubas