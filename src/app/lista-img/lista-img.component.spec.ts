import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImgComponent } from './lista-img.component';

describe('ListaImgComponent', () => {
  let component: ListaImgComponent;
  let fixture: ComponentFixture<ListaImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
