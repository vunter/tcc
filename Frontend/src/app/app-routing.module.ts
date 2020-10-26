import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { getHomeComponent } from './utils/matcher/homeMatcher'

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: MainComponent, children: [
    { path: '', component: getHomeComponent() },
    { path: 'home', redirectTo: '' },
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
