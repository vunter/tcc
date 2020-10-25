import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
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
    private router: Router) { }

  ngOnInit(): void {
    this.login = new LoginForm();
  }

  onSubmit() {
    this.service.attemptLogin(this.login.user, this.login.password).subscribe(
      response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/home']);
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

}

class LoginForm {
  user: string;
  password: string;
}
