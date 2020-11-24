import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { ToastService } from './../../toast.service';
import { BlocosService } from './../../shared/services/blocos.service';
import { TurmaService } from './../../shared/services/turma.service';
import { Bloco } from './../../shared/entity/Bloco';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.css']
})
export class HomeProfessorComponent implements OnInit {


  blocos: Bloco[];
  pubs: String[] = [];
  constructor(
    private turmaService: TurmaService,
    private blocoService: BlocosService,
    private toast: ToastService,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

    if(this.auth.isAuthenticated()) {
      this.router.navigate(['home'])
    }

     this.blocoService.getBlocosByProfessor(3).subscribe(
       (response) =>{

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
