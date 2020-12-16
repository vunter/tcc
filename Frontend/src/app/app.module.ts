import { SharedModule } from './shared/shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponentPublic } from './public-components/home-public/home-public.component';
import { HomeModule } from './components/home/home.module';
import { Global } from './shared/GlobalUse';
import { AulaModule } from './components/aula/aula.module';
import { CadastroComponent } from './public-components/cadastro/cadastro.component';
import { LoginComponent } from './public-components/login/login.component';
import { SpinnerInterceptor } from './spinner.interceptor';
import { AuthService } from './shared/services/auth.service';
import { UsuarioService } from './shared/services/usuario.service';
import { TokenInterceptor } from './token.interceptor';
import { TemplateModule } from './template/template.module';
import { MainComponent } from './main/main.component';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { SobreComponent } from './public-components/sobre/sobre.component';
import { PublicNavbarComponent } from './public-components/public-navbar/public-navbar.component';
import { TurmaComponent } from './components/turma/turma.component';
import { AulaComponent } from './components/aula/aula.component';
import { NgxBlocklyModule } from 'ngx-blockly';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponentPublic,
    CadastroComponent,
    SobreComponent,
    PublicNavbarComponent,
    TurmaComponent,
    AulaComponent
  ],
  imports: [
    BrowserModule,
    NgxBlocklyModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AulaModule,
    HomeModule,
    ComponentsModule,
    SharedModule
   ],
  providers: [
    UsuarioService,
    AuthService,
    Global,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: UsuarioService) => () => service.configGlobal(),
      deps: [UsuarioService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
