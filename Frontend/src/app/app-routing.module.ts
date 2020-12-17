import { VerAvaliacoesComponent } from './components/ver-avaliacoes/ver-avaliacoes.component';
import { GerenciarAvaliacoesComponent } from './components/gerenciar-avaliacoes/gerenciar-avaliacoes.component';
import { PerfilGuard } from './perfil.guard';
import { BlocosComponent } from './components/blocos/blocos.component';
import { GerenciarAulasComponent } from './components/gerenciar-aulas/gerenciar-aulas.component';
import { NotFoundComponent } from './template/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { HomeComponentPublic } from './public-components/home-public/home-public.component';
import { AulaComponent } from './components/aula/aula.component';

import { TurmaComponent } from './components/turma/turma.component';
import { SobreComponent } from './public-components/sobre/sobre.component';
import { LoginComponent } from './public-components/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { CadastroComponent } from './public-components/cadastro/cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', component: HomeComponentPublic },
  {
    path: '', component: MainComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'turma', component: TurmaComponent },
      { path: 'aula', component: AulaComponent },
      { path: 'avaliacoes', component: VerAvaliacoesComponent, canActivate: [PerfilGuard] },
      { path: 'gerenciar/aulas', component: GerenciarAulasComponent, canActivate: [PerfilGuard] },
      { path: 'gerenciar/blocos', component: BlocosComponent, canActivate: [PerfilGuard] },
      { path: 'gerenciar/avaliacoes', component: GerenciarAvaliacoesComponent, canActivate: [PerfilGuard] }


    ], canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

  constructor(public auth: AuthService) { }

}
