import { Injectable } from '@angular/core';
import { User } from './entity/user';

@Injectable()
export class Global {

  user: User;

  xml: String = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="controls_if" id="a{d=sG" x="751" y="-88"></block>
  </xml>`;

}
