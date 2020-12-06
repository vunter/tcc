import { User } from './../../../shared/entity/user';
import { environment } from './../../../../environments/environment';
import { ToastService } from './../../../toast.service';
import { Global } from './../../../shared/GlobalUse';
import * as SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Message } from './../../../shared/entity/Message';
import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private serverUrl = environment.url + 'socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;

  @Input() toUser: User;


  messages: Message[] = [];
  usuario: User;
  mensagemForm: MessageForm;
  mensagensMap: Map<number, { mensagens: Message[], newMessage: boolean }> = new Map<number, { mensagens: Message[], newMessage: boolean }>();

  constructor(
    private toastr: ToastService,
    private globals: Global
  ) {
    this.usuario = this.globals.user;
  }

  ngOnInit(): void {
    this.mensagemForm = new MessageForm();
    this.initializeWebSocketConnection();

  }

  sendMessage() {
    if (this.mensagemForm.mensagem && this.mensagemForm.mensagem != '') {
      let message: Message = { message: this.mensagemForm.mensagem, fromId: this.globals.user.id, toId: this.toUser.id == 0 ? undefined : this.toUser.id };
      this.messages.push(message);
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
      this.mensagemForm.mensagem = '';
    }
  }

  sendPrintRequest(targetid) {
    this.stompClient.send("/socket-subscriber/print", {}, JSON.stringify({ originId: this.globals.user.id, targetId: targetid }))
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket();
      that.openSocket();
    });
  }
  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.globals.user.id, (message) => {
        this.handleResult(message);
      });
      this.openPrintConnection();
    }
  }

  openPrintConnection() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/print-socket/" + this.globals.user.id, (request) => {
        this.handlePrint(request)
      });

    }
  }

  sendPrint(canvasObj) {
    this.stompClient.send("/socket-subscriber/printReturn", {}, JSON.stringify({ originId: canvasObj.targetId, targetId: canvasObj.originId, base64Image: canvasObj.base64Image }))
  }

  handlePrint(request) {
    if (request.body) {
      let requestHandled = JSON.parse(request.body);
      if (!requestHandled.base64Image) {

        html2canvas(document.querySelector("#capture")).then(canvas => {
          requestHandled.base64Image = canvas.toDataURL();
          this.sendPrint(requestHandled);
        });
      } else {
        var img = document.createElement('img');
        img.setAttribute('download', 'myImage.png');
        img.src = requestHandled.base64Image;
        document.body.appendChild(img);
      }
    }
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      if (messageResult.fromId == this.toUser.id) {
        this.messages.push(messageResult);
      } else {
        if (messageResult.toId) {
          let arrayMessage = this.mensagensMap.get(Number(messageResult.fromId));
          arrayMessage.mensagens.push(messageResult);
          arrayMessage.newMessage = true;
          this.mensagensMap.set(messageResult.toId, arrayMessage);
        }
      }

    }
  }


  changeChatAluno(idNew, idOld) {
    this.mensagensMap.set(idOld, { mensagens: this.messages, newMessage: false });
    let newConversation = this.mensagensMap.get(idNew);
    this.messages = newConversation.mensagens;
    newConversation.newMessage = false;
    this.mensagensMap.set(idNew, newConversation);

  }


  createMapAlunosMensagens(array: User[]) {
    this.mensagensMap.set(0, { mensagens: [], newMessage: false })
    array.forEach((a) => {
      this.mensagensMap.set(a.id, { mensagens: [], newMessage: false });
    })
  }

}

class MessageForm {
  mensagem: string;
}
