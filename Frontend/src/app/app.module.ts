import { RespostaService } from './shared/services/resposta.service';
import { ComponentsModule } from './components/components.module';
import { HomeComponentPublic } from './public-components/home-public/home-public.component';
import { HomeModule } from './components/home/home.module';
import { Global } from './shared/GlobalUse';
import { AulaModule } from './components/aula/aula.module';
import { CadastroComponent } from './public-components/cadastro/cadastro.component';
import { LoginComponent } from './public-components/login/login.component';
import { LocalDateTimePipe } from './shared/pipes/local-date-time.pipe';
import { NewLinePipe } from './shared/pipes/new-line.pipe';
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
import { BlocosComponent } from './components/blocos/blocos.component';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
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
    LocalDateTimePipe,
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
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AulaModule,
    HomeModule,
    ComponentsModule
   ],
  providers: [
    UsuarioService,
    AuthService,
    LocalDateTimePipe,
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
