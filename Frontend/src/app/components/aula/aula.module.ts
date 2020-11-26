import { NgxBlocklyModule } from 'ngx-blockly';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulaAlunoComponent } from './aula-aluno/aula-aluno.component';
import { AulaProfessorComponent } from './aula-professor/aula-professor.component';



@NgModule({
  declarations: [
    AulaAlunoComponent,
    AulaProfessorComponent
  ],
  imports: [
    CommonModule,
    NgxBlocklyModule
  ],
  exports: [
    AulaAlunoComponent,
    AulaProfessorComponent
  ]
})
export class AulaModule {}
