import { NewLinePipe } from './../shared/pipes/new-line.pipe';
import { BlocosComponent } from './blocos/blocos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciarAulasComponent } from './gerenciar-aulas/gerenciar-aulas.component';



@NgModule({
  declarations: [
    BlocosComponent,
    NewLinePipe,
    GerenciarAulasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlocosComponent,
    GerenciarAulasComponent
  ],
  providers: [
    NewLinePipe
  ]
})
export class ComponentsModule { }
