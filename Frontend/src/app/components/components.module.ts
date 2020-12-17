import { LocalDateTimePipe } from './../shared/pipes/local-date-time.pipe';
import { SharedModule } from './../shared/shared/shared.module';
import { NewLinePipe } from './../shared/pipes/new-line.pipe';
import { BlocosComponent } from './blocos/blocos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarAulasComponent } from './gerenciar-aulas/gerenciar-aulas.component';
import { GerenciarAvaliacoesComponent } from './gerenciar-avaliacoes/gerenciar-avaliacoes.component';
import { VerAvaliacoesComponent } from './ver-avaliacoes/ver-avaliacoes.component';



@NgModule({
  declarations: [
    BlocosComponent,
    NewLinePipe,
    GerenciarAulasComponent,
    GerenciarAvaliacoesComponent,
    VerAvaliacoesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BlocosComponent,
    GerenciarAulasComponent,
    GerenciarAvaliacoesComponent,
    VerAvaliacoesComponent
  ],
  providers: [
    NewLinePipe,
    LocalDateTimePipe
  ]
})
export class ComponentsModule { }
