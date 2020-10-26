import { HomeComponent } from './../../home/home.component';
import { Type, Component } from '@angular/core';

export function getHomeComponent(): Type<Component> {

return <Type<Component>>HomeComponent;

}
