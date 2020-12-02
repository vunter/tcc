import { Publicacao } from './../../../shared/entity/Publicacao';
import { UsuarioService } from './../../../shared/services/usuario.service';
import { Global } from '../../../shared/GlobalUse';
import { Bloco } from './../../../shared/entity/Bloco';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from 'src/app/shared/services/turma.service';
import { BlocosService } from 'src/app/shared/services/blocos.service';
import { ToastService } from 'src/app/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.css']
})
export class HomeProfessorComponent implements OnInit {


  blocos: Bloco[];
  pubs: Publicacao[] = [];
  constructor(
    private turmaService: TurmaService,
    private blocoService: BlocosService,
    private toast: ToastService,
    private auth: AuthService,
    private router: Router,
    private globals: Global,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      this.router.navigate(['home'])
    }
    this.doInitConfigs();
  }

  doInitConfigs() {
    this.blocoService.getBlocosByProfessor(this.globals.user.id).subscribe(
      (response) => {
        this.blocos = response;
      }, (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        });
      });

    this.turmaService.getPublicacoes(1).subscribe(response => {
      this.pubs = response;
    });
  }

}
