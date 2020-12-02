import { ToastService } from './../../toast.service';
import { AuthService } from './../../shared/services/auth.service';
import { User } from '../../shared/entity/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ValidateBrService } from 'angular-validate-br';

export class PasswordStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    return control.parent.errors && (control.parent.errors['notSame'] || control.parent.errors['confirmPassRequired']);
  }
}
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CadastroComponent implements OnInit {
  user: User;
  cadastroForm: FormGroup;
  roles: string[] = ['Aluno', 'Professor'];
  confirmPassMatcher = new PasswordStateMatcher();
  cpfField: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notification: ToastService,
    private router: Router,
    private brValidator: ValidateBrService
  ) {

    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['Aluno', [Validators.required]],
      user: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPass: ['', Validators.required]
    }, { validator: [this.checkPasswords] })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.user = this.cadastroForm.value;
      this.authService.register(this.user).subscribe(
        (response) => {
          this.user = response;
          this.notification.showSuccessTitle('Usuário ' + this.user.user + ' com perfil de: ' + this.user.roles + ' criado com sucesso!',
            'Usuário criado com sucesso!', 10000);
          this.router.navigate(['/login']);
        }, (errorResponse) => {
          errorResponse.error.erros.forEach((e) => {
            this.notification.showError(e);
          });
        });
    } else {
      this.notification.showErrorTitle('Existem campos preenchidos incorretamente', 'Erro ao salvar', 3000);
    }
  }


  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPass').value;
    if (confirmPass != '') {
      return pass === confirmPass ? null : { notSame: true }
    } else {
      return { confirmPassRequired: true }
    }
  }

  handleCPF() {
    if (!this.cpfField) {
      this.cadastroForm.addControl('cpf', new FormControl('', [this.brValidator.cpf]));
      this.cpfField = true;
    } else {
      this.cpfField = false;
      this.cadastroForm.removeControl('cpf');
    }
  }
}
