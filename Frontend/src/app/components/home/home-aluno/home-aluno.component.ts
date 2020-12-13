import { Router } from '@angular/router';
import { Aula } from './../../../shared/entity/Aula';
import { AulaService } from './../../../shared/services/aula.service';
import { PublicService } from './../../../shared/services/public.service';
import { ToastService } from './../../../toast.service';
import { Global } from './../../../shared/GlobalUse';
import { TurmaService } from './../../../shared/services/turma.service';
import { Turma } from './../../../shared/entity/Turma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-aluno',
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.css']
})
export class HomeAlunoComponent implements OnInit {

  turmas: Turma[];
  turmaPublic: Turma[];
  proximasAulas: Aula[];
  aulasIniciadas: Aula[];


  constructor(
    private globals: Global,
    private toast: ToastService,
    private router: Router,
    private turmaService: TurmaService,
    private aulaService: AulaService,
    private publicService: PublicService

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

    this.publicService.listPublicTurmas().subscribe(
      (response) => {
        this.turmaPublic = response;
      }
    );

    this.aulaService.list5ByAlunoId(this.globals.user.id).subscribe(
      (response) => { this.proximasAulas = response }
    )

    this.aulaService.listIniciadasByAlunoId(this.globals.user.id).subscribe(
      (response) => { this.aulasIniciadas = response }
    )
  }

  selectTurma(turma: Turma) {
    console.log('Turma selecionada: ' + turma.titulo)
  }

  entrarTurmaPublic(turma: Turma) {

  }

  entrarAulaAoVivo(aula: Aula) {
    this.router.navigate(['/aula'], { queryParams: { id: aula.id } });
  }

}
