import { Global } from './../../shared/GlobalUse';
import { ToastService } from './../../toast.service';
import { UsuarioService } from './../../shared/services/usuario.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from '../../shared/entity/user';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  errors: String[];

  username: string;
  user: User;

  constructor(
    private router: Router,
    private globals: Global,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.globals.user;
  }

  ngAfterViewInit() {

    jQuery(function ($) {
      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
          $(".sidebar-dropdown").removeClass("active");
          $(this).parent().removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this).next(".sidebar-submenu").slideDown(200);
          $(this).parent().addClass("active");
        }
      });

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });

    });
  }

  logout() {
    this.authService.logout();
  }

  admin() {
    this.router.navigate(['/admin']);
  }
}
