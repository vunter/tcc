import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaAlunoComponent } from './aula-aluno.component';

describe('AulaAlunoComponent', () => {
  let component: AulaAlunoComponent;
  let fixture: ComponentFixture<AulaAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulaAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
