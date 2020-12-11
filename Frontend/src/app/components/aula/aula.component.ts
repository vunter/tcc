import { ToastService } from './../../toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from './../../shared/entity/Aula';
import { AulaService } from './../../shared/services/aula.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { remove } from '../../utils/arrayUtils/removeFromArray';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  user_role: string = "";
  aula: Aula;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private aulaService: AulaService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<any> {
    let idAula;
    this.route.queryParams.subscribe(params => { idAula = params['id'] });

    await this.aulaService.getAula(idAula).pipe(take(1)).toPromise().then((r) => {
      this.aula = r;
    }).catch((e) => {
      e.error.erros.forEach((ex) => { this.toast.showError(ex) });
    })
    if (!this.aula.finalizada) {
      this.user_role = remove(this.authService.getRole(), 'ROLE_USER')[0];
    } else {
      this.toast.showErrorTitle('Esta aula já foi finalizada!', 'Não foi possível entrar na aula', 7000);
      this.router.navigate(['/home']);
    }

  }

  async getAula(idAula) {
    return await this.aulaService.getAula(idAula);
  }

}
