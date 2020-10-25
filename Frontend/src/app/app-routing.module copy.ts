import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: MainComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '' },
  ], canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
