import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { remove } from '../../utils/arrayUtils/removeFromArray';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  user_role: string = "";

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.user_role = remove(this.authService.getRole(), 'ROLE_USER')[0];

  }

}
