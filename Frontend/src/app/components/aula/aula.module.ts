import { WebsocketService } from './../../shared/services/websocket/websocket.service';
import { FormsModule } from '@angular/forms';
import { AulaService } from './../../shared/services/aula.service';
import { BlocosService } from './../../shared/services/blocos.service';
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
    NgxBlocklyModule,
    FormsModule
  ],
  exports: [
    AulaAlunoComponent,
    AulaProfessorComponent
  ],
  providers: [
    BlocosService,
    AulaService,
    WebsocketService
  ]
})
export class AulaModule {}
