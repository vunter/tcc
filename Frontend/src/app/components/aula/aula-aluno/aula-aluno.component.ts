import { Resposta } from './../../../shared/entity/Resposta';
import jQuery from 'jquery';
import { Bloco } from './../../../shared/entity/Bloco';
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
import html2canvas from 'html2canvas';
import * as Blockly from 'blockly';
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
  aula: Aula = new Aula();
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
    private route: ActivatedRoute,
    private globals: Global,
    private blocoService: BlocosService,
    private aulaService: AulaService
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

  }

  async ngAfterViewInit() {

    let p = await this.aulaService.getProfessor(this.idAula).toPromise();
    this.professor = p;
    await this.blocoService.getBlocosAula(this.idAula).toPromise().then((r) => {
      this.blocosProf = r;

    });
    let saved_id = localStorage.getItem('saved_id');
    if (saved_id && this.idAula) {
      if (Number.parseInt(saved_id) == this.idAula) {
        let saved = localStorage.getItem('saved_workspace');
        if (saved)
          this.workspace.fromXml(saved);
      }
    } else {
      this.blocosProf.forEach((bloco) => {
        this.workspace.appendFromXml(bloco.conteudo);
      })
    }

    jQuery(function ($) {
      var sec = 2;
      function pad(val) { return val > 9 ? val : "0" + val; }
      var interval = setInterval(function () {
        $("#seconds").html(pad(--sec % 60));
        $("#minutes").html(parseInt(pad(Number(sec) / 60)));
        if (sec == 0) {
          clearInterval(interval);
        }
      }, 1000);

    });
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

  getCode(): string {
    return this.conteudo;
  }

  limparWorkspace() {
    this.workspace.clear();
    this.blocosProf.forEach((b) => { this.workspace.appendFromXml(b.conteudo) })
  }

  entregar() {
    let resposta = new Resposta();
    resposta.alunoId = this.usuario.id;
    resposta.aulaId = this.idAula;
    resposta.resposta = this.conteudo;
    html2canvas(document.querySelector("#capture")).then(canvas => {
      resposta.print = canvas.toDataURL();
      console.log(resposta.print)
    });
  }

}

class MessageForm {
  mensagem: string;
}
