import { User } from './../../shared/entity/user';
import { Aula } from './../../shared/entity/Aula';
import { Turma } from './../../shared/entity/Turma';
import { AvaliacaoService } from './../../shared/services/avaliacao.service';
import { Resposta } from './../../shared/entity/Resposta';
import { NgxBlocklyComponent, NgxBlocklyGeneratorConfig, NgxBlocklyConfig, NgxToolboxBuilderService } from 'ngx-blockly';
import { RespostaService } from './../../shared/services/resposta.service';
import { Avaliacao } from './../../shared/entity/Avaliacao';
import { MatSort } from '@angular/material/sort';
import { MatAccordion } from '@angular/material/expansion';
import { ToastService } from './../../toast.service';
import { Global } from './../../shared/GlobalUse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gerenciar-avaliacoes',
  templateUrl: './gerenciar-avaliacoes.component.html',
  styleUrls: ['./gerenciar-avaliacoes.component.css']
})
export class GerenciarAvaliacoesComponent implements OnInit {

  @ViewChild('closebuttondelete') closebuttonDelete;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatTable, { static: true }) table: MatTable<Resposta>;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(NgxBlocklyComponent) workspace;


  dataSource: MatTableDataSource<Resposta>;
  displayedColumns: string[] = ['id', 'nome', 'aula', 'turma', 'Ações'];

  panelOpenState: boolean = false;

  respostaForm: FormGroup;
  conteudo: string;
  editing: boolean = false;

  respostasProfessor: Resposta[] = [];
  respostaSelecionada: Resposta = new Resposta();


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
    },
    readOnly: true
  };


  public generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true
  };


  constructor(
    private formBuilder: FormBuilder,
    private globals: Global,
    private toast: ToastService,
    private respostaService: RespostaService,
    private avaliacaoService: AvaliacaoService
  ) {  }
  ngOnInit() {
    this.respostaSelecionada.aluno = new User();
    this.respostaSelecionada.aula = new Aula();
    this.respostaSelecionada.aula.turma = new Turma();


    this.respostaForm = this.formBuilder.group({
      nota: [0, [Validators.required]]
    });


    this.respostaService.getAllbyProfessor(this.globals.user.id).subscribe(
      (response) => {
        this.respostasProfessor = response;
        this.dataSource = new MatTableDataSource(this.respostasProfessor);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'turma': return item.aula.turma.nome;
            case 'aula': return item.aula.titulo;
            case 'nome': return item.aluno.nome;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      }
    );


  }

  submit() {
    if (!this.respostaForm.valid) {
      return;
    }
    let newAvaliacao = new Avaliacao();
    newAvaliacao = this.respostaForm.value;
    newAvaliacao.alunoUserId = this.respostaSelecionada.alunoId;
    newAvaliacao.aulaId = this.respostaSelecionada.aulaId
/*     if (this.editing) {
      newAvaliacao.id = this.respostaSelecionada.id;
    } */
    this.avaliacaoService.save(newAvaliacao).subscribe(
      (response) => {
        /*     if (this.editing) {
              //this.dataSource.data[this.dataSource.data.indexOf(this.respostaSelecionada)] = response;
            } else {
              //this.dataSource.data.push(response);
            } */
        this.editing = false;
        this.closeEditor();
        this.dataSource._updateChangeSubscription();
        this.toast.showSuccess('Avaliacao salva com sucesso!')
      },
      (erroResponse) => {
        erroResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    );
  }


  selectResposta(resposta: Resposta) {
    this.respostaSelecionada = resposta;
    this.workspace.fromXml(resposta.print);
    this.editing = true;
    this.openEditor();
  }

  openEditor() {
    this.accordion.openAll();
  }

  closeEditor() {
    this.accordion.closeAll();
    this.respostaForm.reset()
  }

  newAvaliacao() {
    this.respostaForm.reset()
    this.openEditor();
  }


  onCode(code: string) {
    this.conteudo = code;

    this.workspace.onResize();
  }

  executar() {
    eval(this.conteudo);
  }

}
