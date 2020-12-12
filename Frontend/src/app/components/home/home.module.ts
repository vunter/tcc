import { SharedModule } from './../../shared/shared/shared.module';
import { LocalDateTimePipe } from './../../shared/pipes/local-date-time.pipe';
import { HomeComponent } from './home.component';
import { ComponentsModule } from './../components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { HomeAlunoComponent } from './home-aluno/home-aluno.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';



@NgModule({
  declarations: [
    HomeAlunoComponent,
    HomeProfessorComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IvyCarouselModule,
    SharedModule
  ],
  exports: [
    HomeAlunoComponent,
    HomeProfessorComponent,
    HomeComponent
  ],
  providers: [
    
  ]
})
export class HomeModule { }
