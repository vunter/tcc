import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaProfessorComponent } from './aula-professor.component';

describe('AulaProfessorComponent', () => {
  let component: AulaProfessorComponent;
  let fixture: ComponentFixture<AulaProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaProfessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
