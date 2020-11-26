import { HomeComponent } from './home.component';
import { ComponentsModule } from './../components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { HomeAlunoComponent } from './home-aluno/home-aluno.component';



@NgModule({
  declarations: [
    HomeAlunoComponent,
    HomeProfessorComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    HomeAlunoComponent,
    HomeProfessorComponent,
    HomeComponent
  ]
})
export class HomeModule { }
