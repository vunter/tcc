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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gerenciar-aulas',
  templateUrl: './gerenciar-aulas.component.html',
  styleUrls: ['./gerenciar-aulas.component.css']
})
export class GerenciarAulasComponent implements OnInit {
  @ViewChild('closebuttondelete') closebuttonDelete;


  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Aula>;
  displayedColumns: string[] = ['id', 'titulo', 'objetivo', 'duracao', 'turma.nome', 'dataAula', 'Ações'];



  panelOpenState: boolean = false;

  aulaForm: FormGroup;
  filteredOptions: Observable<Bloco[]>;
  filteredOptionsTurma: Observable<Turma[]>;
  editing: boolean = false;


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
    private turmaService: TurmaService,
    private aulaService: AulaService,
    private blocosService: BlocosService
  ) { }

  async ngOnInit(): Promise<any> {

    this.aulaService.listByProfessorId(this.globals.user.id).subscribe(
      (response) => {
        response.forEach((a) => this.countBlocks(a))
        this.aulasProfessor = response;
        this.dataSource = new MatTableDataSource(this.aulasProfessor);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'turma.nome': return item.turma.nome;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;

      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showWarning(e)
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
      },
    ).catch((errorResponse) => {
      errorResponse.error.erros.forEach((e) => {
        this.toast.showError(e)
      })
    })

    await this.blocosService.getBlocosByProfessor(this.globals.user.id).toPromise().then(
      (response) => {
        this.blocosProfessor = response;
      }
    ).catch((errorResponse) => {
      errorResponse.error.erros.forEach((e) => {
        this.toast.showWarning(e)
      })
    })

    this.aulaForm = this.formBuilder.group({
      titulo: [this.aulaSelecionada.titulo, [Validators.required]],
      dataAula: [this.aulaSelecionada.dataAula ? this.aulaSelecionada.dataAula.split('.')[0] : null, Validators.required],
      duracao: [this.aulaSelecionada.duracao, Validators.required],
      quantidadeMaxBlocos: [this.aulaSelecionada.quantidadeMaxBlocos],
      objetivo: [this.aulaSelecionada.objetivo, Validators.required],
      gabarito: [this.aulaSelecionada.gabarito],
      bloco: [],
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
        map(value => typeof value === 'string' ? value : value.nome),
        map(name => name ? this._filterTurma(name) : this.turmasProfessor.slice())
      );
  }

  submit() {
    if (!this.aulaForm.valid) {
      return;
    }
    let newAula = new Aula();
    newAula = this.aulaForm.value;
    newAula.blocos = [];

    this.blocosAula.forEach((b) => {
      for (let i = 0; i < b.quantidade; i++) {
        newAula.blocos.push(b);
      }
    })
    newAula.turmaId = newAula.turma.id
    if (!this.editing) {
      this.aulaService.save(newAula).subscribe(
        (response) => {
          this.countBlocks(response)
          this.dataSource.data.push(response);
          this.dataSource._updateChangeSubscription();
          this.toast.showSuccess('Aula salva com sucesso!')
        },
        (erroResponse) => {
          erroResponse.error.erros.forEach((e) => {
            this.toast.showError(e);
          })
        }
      );
    } else {
      newAula.id = this.aulaSelecionada.id;
      this.aulaService.edit(newAula).subscribe(
        (response) => {
          this.countBlocks(response);
          this.dataSource.data[this.dataSource.data.indexOf(this.aulaSelecionada)] = response;
          this.selectAula(response)
          this.dataSource._updateChangeSubscription();
          this.toast.showSuccess('Aula salva com sucesso!')
        },
        (erroResponse) => {
          erroResponse.error.erros.forEach((e) => {
            this.toast.showError(e);
          })
        }
      );
    }
  }

  adicionarBloco() {
    let b = { ...this.aulaForm.get('bloco').value };
    b.quantidade = this.aulaForm.get('quantidade').value;
    this.blocosAula.push(b);
  }

  selectAula(aula: Aula) {
    this.aulaSelecionada = aula;
    this.aulaForm.patchValue({
      titulo: aula.titulo,
      dataAula: aula.dataAula.split('.')[0],
      duracao: aula.duracao,
      objetivo: aula.objetivo,
      gabarito: aula.gabarito,
      quantidadeMaxBlocos: aula.quantidadeMaxBlocos,
      turma: aula.turma
    });
    this.blocosAula = aula.blocos;
    this.editing = true;
    this.openEditor();
  }

  displayFn(bloco: Bloco): string {
    return bloco && bloco.titulo ? bloco.titulo : '';
  }

  displayTur(turma: Turma): string {
    return turma && turma.nome ? turma.nome : '';
  }

  private _filterBloco(value: string): Bloco[] {
    const filterValue = value.toLowerCase();

    return this.blocosProfessor.filter(option => option.titulo.toLowerCase().includes(filterValue));
  }

  private _filterTurma(value: string): Turma[] {
    const filterValue = value.toLowerCase();

    return this.turmasProfessor.filter(option => option.nome.toLowerCase().includes(filterValue));
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
    this.aulaForm.reset()
    this.blocosAula = [];
  }

  newAula() {
    this.aulaForm.reset()
    this.openEditor();
  }

  deletarAula() {
    this.aulaService.delete(this.aulaSelecionada).subscribe(
      (response) => {
        this.dataSource.data.splice(this.dataSource.data.indexOf(this.aulaSelecionada), 1);
        this.dataSource._updateChangeSubscription();

        this.toast.showSuccess('Aula deletada com sucesso!')
        this.closebuttonDelete.nativeElement.click();
      },
      (erroResponse) => {
        erroResponse.error.erros.forEach((e) => {
          this.toast.showErrorTitle(e, 'Erro Interno!');
        })
      }
    )
  }

  countBlocks(a: Aula) {
      let current: Bloco = new Bloco();
      let cnt = 0;
      let calculatedBlocksArray: Map<number, Bloco> = new Map<number, Bloco>();
      a.blocos.sort((a,b) => (a.id > b.id) ? 1 : -1);
      a.blocos = [...a.blocos]

      a.blocos.forEach((b, i) => {

        if (b.id != current.id) {
          if (current.id) { calculatedBlocksArray.set(current.id, current) };

          current = {...b};
          cnt = 1;
        } else {
          cnt++;
        }
        current.quantidade = cnt;
        calculatedBlocksArray.set(b.id, current);
      })
      a.blocos = Array.from(calculatedBlocksArray.values());

  }

}
