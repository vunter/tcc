import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    NotFoundComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    NotFoundComponent
  ]
})
export class TemplateModule { }
