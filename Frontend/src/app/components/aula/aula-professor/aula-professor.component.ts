import { ChatComponent } from './../chat/chat.component';
import { AlunoService } from './../../../shared/services/aluno.service';
import { Aula } from './../../../shared/entity/Aula';
import { Message } from './../../../shared/entity/Message';
import { User } from './../../../shared/entity/user';
import { AulaService } from './../../../shared/services/aula.service';
import { Global } from './../../../shared/GlobalUse';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from './../../../toast.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-aula-professor',
  templateUrl: './aula-professor.component.html',
  styleUrls: ['./aula-professor.component.css']
})
export class AulaProfessorComponent implements OnInit, AfterViewInit {

  @ViewChild(ChatComponent) chat: ChatComponent;

  conteudo: string;
  idAula: number;
  aula: Aula;
  usuario: User;

  globalMsg: User = new User();
  alunos: User[];
  alunoSelecionado: User;

  constructor(
    private toast: ToastService,
    private route: ActivatedRoute,
    private globals: Global,
    private aulaService: AulaService,
    private alunoService: AlunoService
  ) {
    this.usuario = this.globals.user;

    this.route.queryParams.subscribe(params => { this.idAula = params['id'] });


  }

  ngOnInit(): void {
    this.alunoSelecionado = this.globalMsg;
  }

  ngAfterViewInit() {
    this.aulaService.getAula(this.idAula).toPromise().then(
      (response) => {
        this.aula = response;
        this.populaAlunosByTurma();
      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      });
  }

  populaAlunosByTurma() {
    this.globalMsg.id = 0;
    this.alunoService.listByTurma(this.aula.id).subscribe(
      (response) => {
        this.alunos = response;
        this.chat.createMapAlunosMensagens(response);
      },
      (errorResponse) => {
        this.alunos = [];
        errorResponse.error.erros.forEach((e) => this.toast.showError(e));
      }
    )
  }

  getCode(): string {
    return this.conteudo;
  }

  selectAluno(aluno: User) {
    this.chat.changeChatAluno(aluno.id, this.alunoSelecionado.id)
    let newConversation = this.chat.mensagensMap.get(aluno.id);
    newConversation.newMessage = false;
    this.chat.mensagensMap.set(aluno.id, newConversation);
    this.alunoSelecionado = aluno;

    /* this.alunoSelecionado = new User();
    this.alunoSelecionado.id = 2;
    this.alunoSelecionado.nome = 'MÁRCIO ANDRÉ AZEVEDO MATOS'; */
  }



}
