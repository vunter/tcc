import { HomeComponent } from './../../public-components/home/home.component';
import { HomeProfessorComponent } from './../../components/home-professor/home-professor.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HomeAlunoComponent } from './../../components/home-aluno/home-aluno.component';
import { Type, Component } from '@angular/core';

export function getHomeComponent(jwtHelper: JwtHelperService): Type<Component> {

  let token = localStorage.getItem('access_token');
  if (token) {
    token = JSON.parse(token).access_token;
    let roles: String[] = jwtHelper.decodeToken(token).authorities;
    return roles.includes('ROLE_ALUNO') ? <Type<Component>> HomeAlunoComponent : <Type<Component>> HomeProfessorComponent;
  } else {
    return <Type<Component>> HomeComponent;
  }


}
