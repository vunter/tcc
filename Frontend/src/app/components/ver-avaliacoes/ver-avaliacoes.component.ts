import { Avaliacao } from './../../shared/entity/Avaliacao';
import { AvaliacaoService } from './../../shared/services/avaliacao.service';
import { ToastService } from './../../toast.service';
import { Global } from './../../shared/GlobalUse';
import { MatSort } from '@angular/material/sort';
import { Resposta } from './../../shared/entity/Resposta';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ver-avaliacoes',
  templateUrl: './ver-avaliacoes.component.html',
  styleUrls: ['./ver-avaliacoes.component.css']
})
export class VerAvaliacoesComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<Avaliacao>;
  @ViewChild(MatSort) sort: MatSort;


  dataSource: MatTableDataSource<Avaliacao>;
  displayedColumns: string[] = ['aula', 'turma', 'nota'];

  constructor(
    private globals: Global,
    private toast: ToastService,
    private avaliacaoService: AvaliacaoService) { }

  ngOnInit(): void {

    this.avaliacaoService.findAllByAluno(this.globals.user.id).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'turma': return item.aula.turma.nome;
            case 'aula': return item.aula.titulo;
            default: return item[property];
          }
        };

        this.dataSource.sort = this.sort;
      },
      (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e)
        })
      }
    )
  }

}
