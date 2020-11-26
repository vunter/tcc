import { remove } from 'src/app/utils/arrayUtils/removeFromArray';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_role: string = "";

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.user_role = remove(this.authService.getRole(), 'ROLE_USER')[0];

  }

}
