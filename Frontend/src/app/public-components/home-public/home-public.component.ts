import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-public',
  templateUrl: './home-public.component.html',
  styleUrls: ['./home-public.component.css']
})
export class HomeComponentPublic implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) this.router.navigate(['/home']);
  }

}
