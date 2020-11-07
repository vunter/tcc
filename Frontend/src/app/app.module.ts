import { AuthService } from './shared/services/auth.service';
import { UsuarioService } from './shared/services/usuario.service';
import { TokenInterceptor } from './token.interceptor';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LocalDateTimePipe } from './shared/pipes/local-date-time.pipe';
import { BlocosComponent } from './components/blocos/blocos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    LocalDateTimePipe,
    BlocosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UsuarioService,
    AuthService,
    LocalDateTimePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
