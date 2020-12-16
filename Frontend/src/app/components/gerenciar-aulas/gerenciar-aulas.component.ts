import { BlocosService } from './../../shared/services/blocos.service';
import { AulaService } from './../../shared/services/aula.service';
import { TurmaService } from './../../shared/services/turma.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from './../../toast.service';
import { Global } from './../../shared/GlobalUse';
import { Turma } from './../../shared/entity/Turma';
import { Observable } from 'rxjs';
import { Bloco } from './../../shared/entity/Bloco';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Aula } from './../../shared/entity/Aula';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gerenciar-aulas',
  templateUrl: './gerenciar-aulas.component.html',
  styleUrls: ['./gerenciar-aulas.component.css']
})
export class GerenciarAulasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataSource: MatTableDataSource<Aula>;

  @ViewChild(MatSort) sort: MatSort;


  panelOpenState: boolean = false;
  displayedColumns: string[] = ['id', 'titulo', 'duracao', 'turmaId', 'dataAula', 'Ações'];

  aulaForm: FormGroup;
  filteredOptions: Observable<Bloco[]>;
  filteredOptionsTurma: Observable<Turma[]>;


  aulaSelecionada: Aula = new Aula();
  turmaAulaSelecionada: Turma = new Turma();
  blocosAula: Bloco[] = [];

  turmasProfessor: Turma[] = [];
  blocosProfessor: Bloco[] = [];
  aulasProfessor: Aula[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private globals: Global,
    private toast: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private turmaService: TurmaService,
    private aulaService: AulaService,
    private blocosService: BlocosService
  ) { }

  async ngOnInit(): Promise<any> {

    this.aulaService.listByProfessorId(this.globals.user.id).subscribe(
      (response) => {
        this.aulasProfessor = response;
        this.dataSource = new MatTableDataSource(this.aulasProfessor);
        this.dataSource.sort = this.sort;

      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      }
    )

    if (history.state.aula) {
      this.aulaSelecionada = history.state.aula;
      await this.turmaService.getTurmaById(this.aulaSelecionada.turmaId).toPromise().then(
        (response) => {
          this.turmaAulaSelecionada = response;
        }
      ).catch((errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      })

      await this.blocosService.getBlocosAula(this.aulaSelecionada.id).toPromise().then(
        (response) => {
          this.blocosAula = response;
        }
      ).catch((errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      })

      this.accordion.openAll();
    }

    await this.turmaService.getTurmasUsuario(this.globals.user.id).toPromise().then(
      (response) => {
        this.turmasProfessor = response;
      }
    )

    await this.blocosService.getBlocosByProfessor(this.globals.user.id).toPromise().then(
      (response) => {
        this.blocosProfessor = response;
      }
    ).catch((errorResponse) => {
      errorResponse.error.erros.forEach((e) => {
        this.toast.showError(e)
      })
    })

    this.aulaForm = this.formBuilder.group({
      titulo: [this.aulaSelecionada.titulo, [Validators.required]],
      dataAula: [this.aulaSelecionada.dataAula ? this.aulaSelecionada.dataAula.split('.')[0] : null, Validators.required],
      duracao: [this.aulaSelecionada.duracao, Validators.required],
      quantidadeMaxBlocos: [this.aulaSelecionada.quantidadeMaxBlocos],
      objetivo: [this.aulaSelecionada.objetivo, Validators.required],
      gabarito: [this.aulaSelecionada.gabarito],
      bloco: [null],
      quantidade: [null],
      turma: [this.turmaAulaSelecionada, Validators.required]
    });

    this.filteredOptions = this.aulaForm.controls.bloco.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(name => name ? this._filterBloco(name) : this.blocosProfessor.slice())
      );

    this.filteredOptionsTurma = this.aulaForm.controls.turma.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.titulo),
        map(name => name ? this._filterTurma(name) : this.turmasProfessor.slice())
      );
  }

  ngAfterViewInit() {
  }

  submit() {
    if (!this.aulaForm.valid) {
      return;
    }
    console.log(this.aulaForm.value);
  }

  adicionarBloco() {
    let b = { ...this.aulaForm.get('bloco').value };
    b.quantidade = this.aulaForm.get('quantidade').value;
    this.blocosAula.push(b);
  }

  selectAula() {

  }

  displayFn(bloco: Bloco): string {
    return bloco && bloco.titulo ? bloco.titulo : '';
  }

  displayTur(turma: Turma): string {
    return turma && turma.titulo ? turma.titulo : '';
  }

  private _filterBloco(value: string): Bloco[] {
    const filterValue = value.toLowerCase();

    return this.blocosProfessor.filter(option => option.titulo.toLowerCase().includes(filterValue));
  }

  private _filterTurma(value: string): Turma[] {
    const filterValue = value.toLowerCase();

    return this.turmasProfessor.filter(option => option.titulo.toLowerCase().includes(filterValue));
  }

  pad(val) { return val > 9 ? val : "0" + val; }

  mathSeconds(value): string {
    return this.pad(value % 60)
  }

  mathMinutes(value): string {
    return parseInt(this.pad(Number(value) / 60)).toString()
  }

  openEditor() {
    this.accordion.openAll();
  }

  closeEditor() {
    this.accordion.closeAll();
  }

}
