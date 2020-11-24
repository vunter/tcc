import { ToastService } from './../../toast.service';
import { UsuarioService } from './../../shared/services/usuario.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import jQuery from 'jquery';
import { User } from 'src/app/shared/entity/user';

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
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private notification: ToastService
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.user.nome = "";
    this.username = this.authService.getCurrentUser();
    this.usuarioService.getLoggedUser(this.username).subscribe(
      (response) => {
        this.user = response;
      },
      (errorResponse) => {
        this.errors = errorResponse.error.erros;
        this.errors.forEach((e) => {
          this.notification.showError(e);
        });
      }
    );
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
