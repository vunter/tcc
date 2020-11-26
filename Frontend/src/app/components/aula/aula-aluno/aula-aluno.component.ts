import { ToastService } from 'src/app/toast.service';
import { Category, COLOUR_CATEGORY, FUNCTIONS_CATEGORY, LISTS_CATEGORY, LOGIC_CATEGORY, LOOP_CATEGORY, MATH_CATEGORY, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService, Separator, TEXT_CATEGORY, VARIABLES_CATEGORY } from 'ngx-blockly';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-aula-aluno',
  templateUrl: './aula-aluno.component.html',
  styleUrls: ['./aula-aluno.component.css']
})
export class AulaAlunoComponent implements OnInit {

  @ViewChild(NgxBlocklyComponent) workspace;
  @ViewChild(NgxBlocklyComponent) blockly;

  conteudo: string;

  constructor(
    private toast: ToastService,
    private ngxToolboxBuilder: NgxToolboxBuilderService
  ) {

    LOGIC_CATEGORY.name = 'Lógica';
    LOOP_CATEGORY.name = 'Loops';
    MATH_CATEGORY.name = 'Matemática';
    TEXT_CATEGORY.name = 'Textos';
    LISTS_CATEGORY.name = 'Listas';
    COLOUR_CATEGORY.name = 'Cores';
    VARIABLES_CATEGORY.name = 'Variáveis';
    FUNCTIONS_CATEGORY.name = 'Funções';

    ngxToolboxBuilder.nodes = [
      LOGIC_CATEGORY,
      LOOP_CATEGORY,
      MATH_CATEGORY,
      TEXT_CATEGORY,
      LISTS_CATEGORY,
      COLOUR_CATEGORY,
      VARIABLES_CATEGORY,
      FUNCTIONS_CATEGORY
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
  }

  ngOnInit(): void {
  }
  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true,
    collapse: true,
    search: {
      enabled: true,
      placeholder: 'Pesquise'
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 10.0,
      minScale: 0.3,
      scaleSpeed: 1.2
    },
    maxBlocks: 5

  };

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    javascript: true
  };

  onCode(code: string) {
    console.log(code)
    this.conteudo = code;
  }


  getCode(): string {
    return this.conteudo;
  }

}
