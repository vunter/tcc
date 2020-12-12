import * as $ from 'jquery';
import { NgxBlocklyGeneratorConfig, NgxBlocklyConfig, NgxBlocklyComponent } from 'ngx-blockly';
import { ChatComponent } from './../chat/chat.component';
import { AlunoService } from './../../../shared/services/aluno.service';
import { Aula } from './../../../shared/entity/Aula';
import { Message } from './../../../shared/entity/Message';
import { User } from './../../../shared/entity/user';
import { AulaService } from './../../../shared/services/aula.service';
import { Global } from './../../../shared/GlobalUse';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from './../../../toast.service';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-aula-professor',
  templateUrl: './aula-professor.component.html',
  styleUrls: ['./aula-professor.component.css']
})
export class AulaProfessorComponent implements OnInit, AfterViewInit {

  @ViewChild(ChatComponent) chat: ChatComponent;
  @ViewChild(NgxBlocklyComponent) workspace;

  @Input()
  aula: Aula;

  interval: any;

  conteudo: string;
  started: boolean = false;
  usuario: User;

  leftBlocks: string = '';
  globalMsg: User = new User();
  alunos: User[];
  alunoSelecionado: User;

  public config: NgxBlocklyConfig = {
    scrollbars: true,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 10.0,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    readOnly: true

  };


  public generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true
  };
  constructor(
    private toast: ToastService,
    private globals: Global,
    private aulaService: AulaService,
    private alunoService: AlunoService,
    private router: Router
  ) {
    this.usuario = this.globals.user;

  }

  ngOnInit(): void {
    this.globalMsg.nome = 'Global';
    this.alunoSelecionado = this.globalMsg;

    this.aulaService.iniciarAula(this.aula.id).subscribe(
      (response) => {
        this.toast.showInfoTitle('Os alunos já podem acessar a aula e constará como "Iniciada" para aqueles que acessarem a turma!', 'Aula aberta', 5000)
      }
    )
  }

  ngAfterViewInit() {
    let that = this;

    jQuery(function ($) {
      function pad(val) { return val > 9 ? val : "0" + val; }
      $("#seconds").html(pad(that.aula.duracao % 60));
      $("#minutes").html(parseInt(pad(Number(that.aula.duracao) / 60)).toString());

    });
    this.populaAlunosByTurma();

  }

  populaAlunosByTurma() {
    let that = this;
    this.globalMsg.id = 0;
    this.alunoService.listByTurma(this.aula.id).subscribe(
      (response) => {
        this.alunos = response;
        this.chat.createMapAlunosMensagens(response);
        setTimeout(function () {
          that.chat.requestConnecteds(response)
        }, 1000)
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
    newConversation.needHelp = false;
    this.chat.mensagensMap.set(aluno.id, newConversation);
    this.alunoSelecionado = aluno;
    this.workspace.clear();
    if (this.alunoSelecionado.id != 0) {
      this.atualizarCodigoAluno();
    }
  }

  startAula() {
    this.chat.startAula(this.alunos)
    let that = this;
    jQuery(function ($) {
      var sec = that.aula.duracao;
      function pad(val) { return val > 9 ? val : "0" + val; }
      that.interval = setInterval(function () {
        $("#seconds").html(pad(--sec % 60));
        $("#minutes").html(parseInt(pad(Number(sec) / 60)).toString());
        if (sec == 0) {
          clearInterval(that.interval);
        }
      }, 1000);

    });
    this.started = true;
  }

  finalizarAula() {
    this.chat.finishClass(this.alunos)
    let that = this;
    jQuery(function ($) {
      clearInterval(that.interval);
    });
    this.toast.showInfoTitle('Esta aula foi finalizada!', 'Aula finalizada', 5000);
    this.toast.showWarning('Aguardando entrega forçada dos próximos alunos, redirecionando em 15 segundos!', 15000);
    this.aula.finalizada = true;
    setTimeout(function () {
      that.aulaService.finalizarAula(that.aula).subscribe(
        (response) => {
          that.toast.showSuccessTitle('Aula finalizada com sucesso!', 'Sucesso!', 4000);
          that.router.navigate(['/home']);
        }
      );
    }, 15000)
  }

  executar() {
    eval(this.conteudo);
  }

  atualizarCodigoAluno() {
    this.chat.requestWorkspace(this.alunoSelecionado.id);
  }

  setWorkspace(xml) {
    this.workspace.fromXml(xml);
    setTimeout(() => {
      this.workspace.workspaceToCode(this.workspace.workspace.id);
      this.workspace.onResize();
    }, 500)
  }

  onCode(code) {
    this.conteudo = code;
  }

  parabenizar() {
    if (this.alunoSelecionado.id != 0) {
      this.chat.sendMessage('Muito bem! Continue assim!')
    }
  }

  precisaDeAjuda() {
    if (this.alunoSelecionado.id != 0) {
      this.chat.sendMessage('Precisa de ajuda?')
    }
  }

}
