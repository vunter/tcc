import { NgxBlocklyConfig, NgxBlocklyGeneratorConfig, LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY, TEXT_CATEGORY, LISTS_CATEGORY, COLOUR_CATEGORY, VARIABLES_CATEGORY, FUNCTIONS_CATEGORY, NgxToolboxBuilderService, NgxBlocklyComponent } from 'ngx-blockly';
import { startWith, map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatAccordion } from '@angular/material/expansion';
import { BlocosService } from './../../shared/services/blocos.service';
import { ToastService } from './../../toast.service';
import { Global } from './../../shared/GlobalUse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Bloco } from './../../shared/entity/Bloco';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.css']
})
export class BlocosComponent implements OnInit {

  @ViewChild('closebuttondelete') closebuttonDelete;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatTable, { static: true }) table: MatTable<Bloco>;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(NgxBlocklyComponent) workspace;


  dataSource: MatTableDataSource<Bloco>;
  displayedColumns: string[] = ['id', 'titulo', 'Ações'];

  panelOpenState: boolean = false;

  blocoForm: FormGroup;
  conteudo: string;
  editing: boolean = false;

  blocosProfessor: Bloco[] = [];
  blocoSelecionado: Bloco = new Bloco();


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
    private formBuilder: FormBuilder,
    private globals: Global,
    private toast: ToastService,
    private ngxToolboxBuilder: NgxToolboxBuilderService,
    private blocosService: BlocosService
  ) { }

  ngOnInit() {

    this.blocosService.getBlocosByProfessor(this.globals.user.id).subscribe(
      (response) => {
        this.blocosProfessor = response;
        this.dataSource = new MatTableDataSource(this.blocosProfessor);
        this.dataSource.sort = this.sort;

      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      }
    )

    this.blocoForm = this.formBuilder.group({
      titulo: ['', [Validators.required]]
    });


    LOGIC_CATEGORY.name = 'Lógica';
    LOOP_CATEGORY.name = 'Loops';
    MATH_CATEGORY.name = 'Matemática';
    TEXT_CATEGORY.name = 'Textos';
    LISTS_CATEGORY.name = 'Listas';
    COLOUR_CATEGORY.name = 'Cores';
    VARIABLES_CATEGORY.name = 'Variáveis';
    FUNCTIONS_CATEGORY.name = 'Funções';

    this.ngxToolboxBuilder.nodes = [
      LOGIC_CATEGORY,
      LOOP_CATEGORY,
      MATH_CATEGORY,
      TEXT_CATEGORY,
      LISTS_CATEGORY,
      COLOUR_CATEGORY,
      VARIABLES_CATEGORY,
      FUNCTIONS_CATEGORY
    ];

    this.config.toolbox = this.ngxToolboxBuilder.build();
  }

  submit() {
    if (!this.blocoForm.valid) {
      return;
    }
    let newBloco = new Bloco();
    newBloco = this.blocoForm.value;
    newBloco.conteudo = this.workspace.toXml();
    newBloco.professorId = this.globals.user.id;

    if (this.editing) {
      newBloco.id = this.blocoSelecionado.id;
    }
    this.blocosService.save(newBloco).subscribe(
      (response) => {
        if (this.editing) {
          this.dataSource.data[this.dataSource.data.indexOf(this.blocoSelecionado)] = response;
        } else {
          this.dataSource.data.push(response);
        }
        this.selectBlock(response)
        this.dataSource._updateChangeSubscription();
        this.toast.showSuccess('Bloco salvo com sucesso!')
      },
      (erroResponse) => {
        erroResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    );
  }


  selectBlock(bloco: Bloco) {
    this.blocoSelecionado = bloco;
    this.blocoForm.patchValue({
      titulo: bloco.titulo
    });
    this.workspace.fromXml(bloco.conteudo);
    this.editing = true;
    this.openEditor();
  }

  openEditor() {
    this.accordion.openAll();
  }

  closeEditor() {
    this.accordion.closeAll();
    this.blocoForm.reset()
  }

  newBloco() {
    this.blocoForm.reset()
    this.openEditor();
  }
/*
  deletarBloco() {
    this.blocosService.delete(this.blocoSelecionado).subscribe(
      (response) => {
        this.dataSource.data.splice(this.dataSource.data.indexOf(this.blocoSelecionado), 1);
        this.dataSource._updateChangeSubscription();

        this.toast.showSuccess('Bloco deletada com sucesso!')
        this.closebuttonDelete.nativeElement.click();
      },
      (erroResponse) => {
        erroResponse.error.erros.forEach((e) => {
          this.toast.showErrorTitle(e, 'Erro Interno!');
        })
      }
    )
  } */

  onCode(code: string) {
    this.conteudo = code;

    this.workspace.onResize();
  }

  executar() {
    eval(this.conteudo);
  }
}
