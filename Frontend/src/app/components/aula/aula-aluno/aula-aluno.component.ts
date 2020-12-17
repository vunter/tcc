import { RespostaService } from 'src/app/shared/services/resposta.service';
import { ChatComponent } from './../chat/chat.component';
import { Resposta } from './../../../shared/entity/Resposta';
import * as jQuery from 'jquery';
import { Bloco } from './../../../shared/entity/Bloco';
import { Message } from './../../../shared/entity/Message';
import { ToastService } from './../../../toast.service';
import { Aula } from './../../../shared/entity/Aula';
import { AulaService } from './../../../shared/services/aula.service';
import { BlocosService } from './../../../shared/services/blocos.service';
import { Global } from '../../../shared/GlobalUse';
import { COLOUR_CATEGORY, FUNCTIONS_CATEGORY, LISTS_CATEGORY, LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService, TEXT_CATEGORY, VARIABLES_CATEGORY } from 'ngx-blockly';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/entity/user';

@Component({
  selector: 'app-aula-aluno',
  templateUrl: './aula-aluno.component.html',
  styleUrls: ['./aula-aluno.component.css']
})
export class AulaAlunoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NgxBlocklyComponent) workspace;
  @ViewChild(ChatComponent) chat;

  @Input()
  aula: Aula;


  interval: any;
  conteudo: string;
  maxBlocks: number = 10;
  leftBlocks: string = '';
  messages: Message[] = [];
  mensagemForm: MessageForm;
  usuario: User = new User();
  professor: User = new User();
  blocosProf: Bloco[] = [];

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
    private globals: Global,
    private blocoService: BlocosService,
    private aulaService: AulaService,
    private respostaService: RespostaService,
    private router: Router
  ) {
    this.usuario = this.globals.user;

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
    let that = this;

    function pad(val) { return val > 9 ? val : "0" + val; }
    $("#seconds").html(pad(that.aula.duracao % 60));
    $("#minutes").html(parseInt(pad(Number(that.aula.duracao) / 60)).toString());

    this.config.maxBlocks = this.aula.quantidadeMaxBlocos;


  }

  async ngAfterViewInit() {
    let that = this;
    let p = await this.aulaService.getProfessor(this.aula.id).toPromise();
    this.professor = p;
    await this.blocoService.getBlocosAula(this.aula.id).toPromise().then((r) => {
      this.blocosProf = r;

    });
    let saved_id = localStorage.getItem('saved_id');
    if (saved_id && this.aula.id && Number.parseInt(saved_id) == this.aula.id) {

      let saved = localStorage.getItem('saved_workspace');
      if (saved)
        this.workspace.fromXml(saved);

    } else {
      this.blocosProf.forEach((bloco) => {
        this.workspace.appendFromXml(bloco.conteudo);
      })
    }

  }

  ngOnDestroy() {
    this.disconnect();
  }

  onCode(code: string) {
    this.conteudo = code;
    if (code) {
      localStorage.setItem('saved_workspace', this.workspace.toXml());
      localStorage.setItem('saved_id', this.aula.id.toString());
    } else {
      localStorage.removeItem('saved_id');
      localStorage.removeItem('saved_workspace');
    }
    this.leftBlocks = this.workspace.workspace.remainingCapacity();
    this.workspace.onResize();
  }

  getWorkspace() {
    this.chat.returnWorkspace(this.workspace.toXml());
  }

  limparWorkspace() {
    this.workspace.clear();
    this.blocosProf.forEach((b) => { this.workspace.appendFromXml(b.conteudo) })
  }

  entregar() {
    let resposta = new Resposta();
    resposta.alunoId = this.usuario.id;
    resposta.aulaId = this.aula.id;
    resposta.resposta = this.conteudo;
    resposta.print = this.workspace.toXml();

    this.respostaService.salvar(resposta).subscribe(
      (response) => {
        resposta = response;
        this.toast.showSuccessTitle('Resposta enviada com sucesso!', 'Entregue com sucesso!', 10000);
        this.disconnect();
        this.router.navigate(['home'])
      }, (error) => {
        error.error.erros.forEach(element => {
          this.toast.showError(element)
        });
      });
  }

  askHelp() {
    this.chat.askHelp()
  }

  executar() {
    eval(this.conteudo);
  }

  classStarted() {
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
  }

  classFinished() {
    var that = this;
    jQuery(function ($) {
      clearInterval(that.interval);
    });

    this.toast.showInfoTitle('Esta aula foi finalizada!', 'Aula finalizada', 3000);
    this.toast.showWarningTitle('Esta aula foi finalizada! Entregando tarefa automaticamente em 10 segundos!', 'Aula chegou ao fim!', 10000);

    setTimeout(function () {
      that.entregar();
    }, 10000);
  }

  disconnect() {
    this.chat.disconnect();
  }

}

class MessageForm {
  mensagem: string;
}
