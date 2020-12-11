import { RespostaService } from './../../shared/services/resposta.service';
import { FormsModule } from '@angular/forms';
import { AulaService } from './../../shared/services/aula.service';
import { BlocosService } from './../../shared/services/blocos.service';
import { NgxBlocklyModule } from 'ngx-blockly';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AulaAlunoComponent } from './aula-aluno/aula-aluno.component';
import { AulaProfessorComponent } from './aula-professor/aula-professor.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AulaAlunoComponent,
    AulaProfessorComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    NgxBlocklyModule,
    FormsModule
  ],
  exports: [
    AulaAlunoComponent,
    AulaProfessorComponent
  ],
  providers: [
    BlocosService,
    AulaService
  ]
})
export class AulaModule {}
