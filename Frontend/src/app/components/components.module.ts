import { NewLinePipe } from './../shared/pipes/new-line.pipe';
import { BlocosComponent } from './blocos/blocos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    BlocosComponent,
    NewLinePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlocosComponent
  ],
  providers: [
    NewLinePipe
  ]
})
export class ComponentsModule { }
