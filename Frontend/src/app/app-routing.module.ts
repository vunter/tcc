import { SobreComponent } from './public-components/sobre/sobre.component';
import { HomeComponent } from './public-components/home/home.component';
import { LoginComponent } from './public-components/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { getHomeComponent } from './utils/matcher/homeMatcher'
import { JwtHelperService } from '@auth0/angular-jwt';
import { CadastroComponent } from './public-components/cadastro/cadastro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent },
  { path: 'sobre', component: SobreComponent },
  { path: '', component: HomeComponent },
  { path: '', component: MainComponent, children: [
    { path: 'home', component: getHomeComponent(new JwtHelperService()) }
  ], canActivate: [AuthGuard]}
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
