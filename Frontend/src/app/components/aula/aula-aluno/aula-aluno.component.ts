import { WebsocketService } from './../../../shared/services/websocket/websocket.service';
import { Message } from './../../../shared/entity/Message';
import { ToastService } from './../../../toast.service';
import { Aula } from './../../../shared/entity/Aula';
import { AulaService } from './../../../shared/services/aula.service';
import { BlocosService } from './../../../shared/services/blocos.service';
import { Global } from '../../../shared/GlobalUse';
import { COLOUR_CATEGORY, FUNCTIONS_CATEGORY, LISTS_CATEGORY, LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService, TEXT_CATEGORY, VARIABLES_CATEGORY } from 'ngx-blockly';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/entity/user';
@Component({
  selector: 'app-aula-aluno',
  templateUrl: './aula-aluno.component.html',
  styleUrls: ['./aula-aluno.component.css']
})
export class AulaAlunoComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxBlocklyComponent) workspace;
  conteudo: string;
  idAula: number;
  maxBlocks: number = 10;
  leftBlocks: string = '';
  aula: Aula;
  messages: Message[] = [];
  mensagemForm: MessageForm;
  usuario: User;
  professor: User;

  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true,
    collapse: true,
    search: {
      enabled: true,
      placeholder: 'Pesquise'
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 10.0,
      minScale: 0.3,
      scaleSpeed: 1.2
    }

  };


  public generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true
  };

  constructor(
    private toast: ToastService,
    private ngxToolboxBuilder: NgxToolboxBuilderService,
    private route: ActivatedRoute,
    private globals: Global,
    private blocoService: BlocosService,
    private aulaService: AulaService,
    private socket: WebsocketService
  ) {
    this.usuario = this.globals.user;

    this.route.queryParams.subscribe(params => { this.idAula = params['id'] });

    this.aulaService.getAula(this.idAula).toPromise().then(
      (response) => {
        this.aula = response;
        this.config.maxBlocks = this.aula.quantidadeMaxBlocos;
      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          toast.showError(e)
        })
      });


    LOGIC_CATEGORY.name = 'Lógica';
    LOOP_CATEGORY.name = 'Loops';
    MATH_CATEGORY.name = 'Matemática';
    TEXT_CATEGORY.name = 'Textos';
    LISTS_CATEGORY.name = 'Listas';
    COLOUR_CATEGORY.name = 'Cores';
    VARIABLES_CATEGORY.name = 'Variáveis';
    FUNCTIONS_CATEGORY.name = 'Funções';

    ngxToolboxBuilder.nodes = [
      LOGIC_CATEGORY,
      LOOP_CATEGORY,
      MATH_CATEGORY,
      TEXT_CATEGORY,
      LISTS_CATEGORY,
      COLOUR_CATEGORY,
      VARIABLES_CATEGORY,
      FUNCTIONS_CATEGORY
    ];

    this.config.toolbox = ngxToolboxBuilder.build();
  }

  ngOnInit(): void {
    this.mensagemForm = new MessageForm();
    this.aulaService.getProfessor(this.idAula).subscribe(
      (response) => {
        this.professor = response;
      }, (errorResponse) => {
        errorResponse.error.erros.forEach(e => {
          this.toast.showError(e);
        });
      })
      this.socket.initializeWebSocketConnection()
      this.socket.openSocket();
  }

  ngAfterViewInit() {
    let saved_id = localStorage.getItem('saved_id');
    if (saved_id && this.idAula) {
      if (Number.parseInt(saved_id) == this.idAula) {
        let saved = localStorage.getItem('saved_workspace');
        if (saved)
          this.workspace.fromXml(saved);
      }
    } else {
      this.blocoService.getBlocosByProfessor(3).toPromise().then((r) => {
        setTimeout(() => {
          r.forEach((o) => {
            this.workspace.appendFromXml(o.conteudo);
          })
        }, 500);
      })
    }
  }

  onCode(code: string) {
    if (code) {
      this.conteudo = code;
      localStorage.setItem('saved_workspace', this.workspace.toXml());
      localStorage.setItem('saved_id', this.idAula.toString());
    } else {
      localStorage.removeItem('saved_id');
      localStorage.removeItem('saved_workspace');
    }
    this.leftBlocks = this.workspace.workspace.remainingCapacity();
    this.workspace.onResize();
  }


  sendMessage() {
    if (this.mensagemForm.mensagem) {
      this.socket.sendMessageUsingSocket(this.mensagemForm.mensagem, this.professor.id)
      this.messages.push({
        message: this.mensagemForm.mensagem,
        fromId: this.globals.user.id,
        toId: 1,
        takePrint: false
      })
    }
    this.mensagemForm.mensagem = "";

  }

  getCode(): string {
    return this.conteudo;
  }

}

class MessageForm {
  mensagem: string;
}
