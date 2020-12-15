import { Aula } from './../../shared/entity/Aula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerenciar-aulas',
  templateUrl: './gerenciar-aulas.component.html',
  styleUrls: ['./gerenciar-aulas.component.css']
})
export class GerenciarAulasComponent implements OnInit {


  aulaSelecionada: Aula = new Aula();

  constructor() { }

  ngOnInit(): void {

    if(history.state.aula) {
      this.aulaSelecionada = history.state.aula;
    }
    console.log(this.aulaSelecionada)

  }

}
