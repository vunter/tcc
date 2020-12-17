import { TurmaService } from './../../shared/services/turma.service';
import { Turma } from './../../shared/entity/Turma';
import { MatSort } from '@angular/material/sort';
import { MatAccordion } from '@angular/material/expansion';
import { ToastService } from './../../toast.service';
import { Global } from './../../shared/GlobalUse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gerenciar-turmas',
  templateUrl: './gerenciar-turmas.component.html',
  styleUrls: ['./gerenciar-turmas.component.css']
})
export class GerenciarTurmasComponent implements OnInit {

  @ViewChild('closebuttondelete') closebuttonDelete;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatTable, { static: true }) table: MatTable<Turma>;
  @ViewChild(MatSort) sort: MatSort;


  dataSource: MatTableDataSource<Turma>;
  displayedColumns: string[] = ['id', 'nome', 'codigo', 'publico', 'qtdAlunosMatriculados', 'capacidade', 'Ações'];

  panelOpenState: boolean = false;

  turmaForm: FormGroup;
  editing: boolean = false;

  turmasProfessor: Turma[] = [];
  turmaSelecionada: Turma = new Turma();



  constructor(
    private formBuilder: FormBuilder,
    private globals: Global,
    private toast: ToastService,
    private turmaService: TurmaService
  ) { }

  ngOnInit() {

    this.turmaService.getTurmasUsuario(this.globals.user.id).subscribe(
      (response) => {
        this.turmasProfessor = response;
        this.dataSource = new MatTableDataSource(this.turmasProfessor);
        this.dataSource.sort = this.sort;

      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      }
    )

    this.turmaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      publico: [false, [Validators.required]],
      capacidade: ['', [Validators.required]],
    });
  }

  submit() {
    if (!this.turmaForm.valid) {
      return;
    }
    let newTurma = new Turma();
    newTurma = this.turmaForm.value;
    newTurma.professorUserId = this.globals.user.id;
    if (this.editing) {
      newTurma.id = this.turmaSelecionada.id;
      newTurma.codigo = this.turmaSelecionada.codigo;
    }
    this.turmaService.save(newTurma).subscribe(
      (response) => {
        if (this.editing) {
          this.dataSource.data[this.dataSource.data.indexOf(this.turmaSelecionada)] = response;
        } else {
          this.dataSource.data.push(response);
        }
        this.editing = false;
        this.closeEditor();
        this.dataSource._updateChangeSubscription();
        this.toast.showSuccess('Turma salva com sucesso!')
      },
      (erroResponse) => {
        erroResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    );
  }


  selectTurma(turma: Turma) {
    this.turmaSelecionada = turma;
    this.patchForm(turma);
    this.editing = true;
    this.openEditor();
  }

  openEditor() {
    this.accordion.openAll();
  }

  closeEditor() {
    this.accordion.closeAll();
    this.turmaForm.reset()
  }

  patchForm(turma: Turma) {
    this.turmaForm.patchValue({
      nome: turma.nome,
      descricao: turma.descricao,
      publico: turma.publico,
      capacidade: turma.capacidade,
    });
  }

  newTurma() {
    this.turmaForm.reset()
    this.openEditor();
  }

}
