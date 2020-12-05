import { User } from './../../shared/entity/user';
import { Global } from './../../shared/GlobalUse';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    globals: Global
  ) {
    this.user = globals.user
   }

  ngOnInit(): void {
  }

}
