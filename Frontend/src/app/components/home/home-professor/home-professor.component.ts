import { Router } from '@angular/router';
import { Aula } from './../../../shared/entity/Aula';
import { AulaService } from './../../../shared/services/aula.service';
import { PublicService } from './../../../shared/services/public.service';
import { ToastService } from './../../../toast.service';
import { Global } from './../../../shared/GlobalUse';
import { TurmaService } from './../../../shared/services/turma.service';
import { Turma } from './../../../shared/entity/Turma';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.css']
})
export class HomeProfessorComponent implements OnInit {

  turmas: Turma[];
  proximasAulas: Aula[];


  constructor(
    private globals: Global,
    private toast: ToastService,
    private router: Router,
    private turmaService: TurmaService,
    private aulaService: AulaService

  ) { }

  ngOnInit(): void {

    this.turmaService.getTurmasUsuario(this.globals.user.id).subscribe(
      (response) => {
        this.turmas = response
      },
      (error) => {
        error.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    );

    this.aulaService.list5ByAlunoId(this.globals.user.id).subscribe(
      (response) => { this.proximasAulas = response }
    )

  }

  selectTurma(turma: Turma) {
    this.router.navigate(['/turma'], { queryParams: { id: turma.id }, state: { turma: turma } });
  }

}
