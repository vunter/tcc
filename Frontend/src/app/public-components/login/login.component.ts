import { ToastService } from './../../toast.service';
import { UsuarioService } from './../../shared/services/usuario.service';
import { Global } from './../../shared/Global';
import { AuthService } from './../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginForm;
  loginError: boolean;
  errorMessage: string;

  constructor(private service: AuthService,
    private usuarioService: UsuarioService,
    private globals: Global,
    private toast: ToastService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.login = new LoginForm();
  }

  onSubmit() {
    this.service.attemptLogin(this.login.user, this.login.password).subscribe(
      response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.setUserGlobalsAndRedirect();
        this.loginError = false;
      }, errorResponse => {
        this.loginError = true;

        if (errorResponse.status == 0) {
          this.errorMessage = 'Não foi possível comunicar com servidor.'
        } else {
          this.errorMessage = 'Login ou Usuário incorretos!'
        }
      }
    )

  }

  setUserGlobalsAndRedirect() {
    this.usuarioService.getLoggedUser().subscribe(
      (response) => {
        this.globals.user = response;
        this.router.navigate(['/home']);
      },
      (errorResponse) => {this.toast.showWarning('Não foi possível definir usuário como global, o sistema pode não funcionar corretamente!', 6000);}
    );
  }

}

class LoginForm {
  user: string;
  password: string;
}
