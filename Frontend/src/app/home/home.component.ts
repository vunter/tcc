import { TurmaService } from './../shared/services/turma.service';
import { Bloco } from './../shared/entity/Bloco';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blocos: Bloco[];
  pubs: String[] = [];
  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {

    this.blocos = [
      {conteudo: "Teste 1", title: "Teste 1"},
      {conteudo: "Teste 2", title: "Teste 2"}
    ];

    this.turmaService.getPublicacoes(1).subscribe(response => {
      this.pubs = response;
    });

  }

}
