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
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', component: HomeComponentPublic },
  { path: '', component: MainComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'turma', component: TurmaComponent },
    { path: 'aula', component: AulaComponent }
  ], canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

  constructor(public auth: AuthService) {}

}
