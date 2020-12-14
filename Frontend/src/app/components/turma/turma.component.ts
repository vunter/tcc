import { PublicacaoService } from './../../shared/services/publicacao.service';
import { Aula } from './../../shared/entity/Aula';
import { Publicacao } from './../../shared/entity/Publicacao';
import { Global } from './../../shared/GlobalUse';
import { ToastService } from './../../toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from './../../shared/services/turma.service';
import { AulaService } from './../../shared/services/aula.service';
import { Turma } from './../../shared/entity/Turma';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  turma: Turma = new Turma();

  pubs: Publicacao[] = [];
  pubText: string;
  replyText: string;

  proximasaulas: Aula[] = [];
  aulaAoVivo: Aula = new Aula();
  isAulaAoVivo: boolean = false;

  isProfessor: boolean = false;


  constructor(
    private globals: Global,
    private toast: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private turmaService: TurmaService,
    private aulaService: AulaService,
    private publicacaoService: PublicacaoService
  ) { }

  ngOnInit(): void {
    let turmaId;
    this.activatedRoute.queryParams.subscribe(params => { turmaId = params['id'] });

    if (this.globals.user.roles.includes('Professor')) {
      this.isProfessor = true;
    }

    if (history.state.turma) {
      this.turma = history.state.turma;
    } else {
      this.turmaService.getTurmaById(turmaId).subscribe(
        (response) => this.turma = response,
        (errorResponse) => {
          errorResponse.error.erros.forEach((e) => {
            this.turma = new Turma();
            this.toast.showError(e);
          });
        }
      )
    }

    this.turmaService.getPublicacoes(turmaId).subscribe(
      (response) => {
        this.pubs = response;
      },
      (errorResponse) => {
        errorResponse.error.erros.forEach(element => {
          console.log(element)
        });
      }
    );

    this.aulaService.listByTurmaId(turmaId).subscribe(
      (response) => {
        this.proximasaulas = response
      },
      (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showWarning(e);
        })
      }
    );
    if (!this.isProfessor) {
      this.aulaService.getAulaIniciadaturma(turmaId).subscribe(
        (response) => {
          this.isAulaAoVivo = true;
          this.aulaAoVivo = response;
        },
        (errorResponse) => {
          errorResponse.error.erros.forEach(element => {
            console.log(element)
          });
        }
      );
    }
  }


  enviarPub() {
    let pub = new Publicacao();
    pub.autor = this.globals.user;
    pub.conteudo = this.pubText;
    pub.turmaId = this.turma.id;

    this.publicacaoService.save(pub).subscribe(
      (response) => {
        pub.data = 'Agora';
        this.pubs.push(pub);
        this.pubText = '';
        this.toast.showSuccess('Publicação enviada com sucesso!')
      },
      (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    )
  }

  enviarReply(pubToReply: Publicacao) {
    let reply = new Publicacao();
    reply.autor = this.globals.user;
    reply.conteudo = this.replyText;
    reply.turmaId = this.turma.id;

    this.publicacaoService.saveReply(reply, pubToReply.id).subscribe(
      (response) => {
        reply.data = 'Agora';
        pubToReply.replies.push(reply);
        this.replyText = '';
        this.toast.showSuccess('Sua resposta foi publicada com sucesso!')
      },
      (errorResponse) => {
        errorResponse.error.erros.forEach((e) => {
          this.toast.showError(e);
        })
      }
    )
  }

  ingressarAula() {
    this.router.navigate(['/aula'], { queryParams: { id: this.aulaAoVivo.id } })
  }

  agendarAula() {

  }

}
