import { Bloco } from './../../shared/entity/Bloco';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.css']
})
export class BlocosComponent implements OnInit {

  @Input() bloco: Bloco;

  constructor() { }

  ngOnInit(): void {
  }

}
