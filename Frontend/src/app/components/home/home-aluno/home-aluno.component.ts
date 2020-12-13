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
  selector: 'app-home-aluno',
  templateUrl: './home-aluno.component.html',
  styleUrls: ['./home-aluno.component.css']
})
export class HomeAlunoComponent implements OnInit {

  @ViewChild('closebutton') closebutton;


  turmas: Turma[];
  turmaPublic: Turma[];
  proximasAulas: Aula[];
  aulasIniciadas: Aula[];

  enterTurmaForm: EnterTurmaForm;
  codTurma: string = '';
  codTurmaValid: boolean = false;

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
        let that = this;

        setTimeout(function () {
          that.turmas.forEach((e) => {

            that.turmaPublic = that.turmaPublic.filter(obj => obj.id !== e.id);

          })
        }, 100)
      }
    );

    this.aulaService.list5ByAlunoId(this.globals.user.id).subscribe(
      (response) => { this.proximasAulas = response }
    )

    this.aulaService.listIniciadasByAlunoId(this.globals.user.id).subscribe(
      (response) => { this.aulasIniciadas = response }
    )
    this.enterTurmaForm = new EnterTurmaForm();

  }

  selectTurma(turma: Turma) {
    this.router.navigate(['/turma'], { queryParams: { id: turma.id } });
  }

  entrarTurmaPublic(turma: Turma) {
    this.turmaService.entrarEmTurma(turma.codigo, this.globals.user).subscribe(
      (response) => this.router.navigate(['turma'], { queryParams: { id: response.id } })
    );
  }

  entrarAulaAoVivo(aula: Aula) {
    this.router.navigate(['/aula'], { queryParams: { id: aula.id } });
  }

  validarCodTurma() {
    if (this.codTurma == '' || this.codTurma.trim().replace(/\s/g, "").length < 6) {
      this.codTurmaValid = false;
    } else {
      this.codTurmaValid = true
    }
  }

  onSubmit() {
    this.closebutton.nativeElement.click();
    this.turmaService.entrarEmTurma(this.codTurma, this.globals.user).subscribe(
      (response) => this.router.navigate(['turma'], { queryParams: { id: response.id } }),
      (error) => {
        error.error.erros.forEach(element => {
          this.toast.showError(element);
        });
      }
    );
  }

}

class EnterTurmaForm {
  codTurma: string;
}
