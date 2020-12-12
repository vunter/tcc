import { LocalDateTimePipe } from './../pipes/local-date-time.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LocalDateTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocalDateTimePipe
  ]
})
export class SharedModule { }
