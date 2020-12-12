import { User } from './../../../shared/entity/user';
import { environment } from './../../../../environments/environment';
import { ToastService } from './../../../toast.service';
import { Global } from './../../../shared/GlobalUse';
import * as SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Message } from './../../../shared/entity/Message';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() toUser: User;

  @Output()
  workspaceRequired: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  workspaceReceived: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  classStarted: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  classFinished: EventEmitter<String> = new EventEmitter<String>();

  private serverUrl = environment.url + 'socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;



  messages: Message[] = [];
  usuario: User;
  mensagemForm: MessageForm;
  mensagensMap: Map<number, { mensagens: Message[], newMessage: boolean, needHelp?: boolean }> = new Map<number, { mensagens: Message[], newMessage: boolean, needHelp?: boolean }>();

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

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    // this.stompClient.debug = null;
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
    }
  }

  sendMessage(customMessage?) {
    if (customMessage || (this.mensagemForm.mensagem && this.mensagemForm.mensagem != '')) {
      let message: Message = { message: customMessage ? customMessage : this.mensagemForm.mensagem, fromId: this.globals.user.id, toId: this.toUser.id == 0 ? undefined : this.toUser.id };
      this.messages.push(message);
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
      this.mensagemForm.mensagem = '';
    }
  }

  askHelp() {
    let message: Message = { message: '', fromId: this.globals.user.id, toId: this.toUser.id };
    this.stompClient.send("/socket-subscriber/askHelp", {}, JSON.stringify(message));

  }

  requestWorkspace(idAluno) {
    if (idAluno != 0) {
      this.stompClient.send("/socket-subscriber/xmlAluno", {}, idAluno);
    } else {
      this.toastr.showError("Não é possível solicitar progresso de Global!")
    }
  }

  returnWorkspace(xml) {
    let message: Message = { message: xml, fromId: this.globals.user.id, toId: this.toUser.id == 0 ? undefined : this.toUser.id };
    this.stompClient.send("/socket-subscriber/returnXml", {}, JSON.stringify(message));
  }

  startAula(user: User[]) {
    this.stompClient.send("/socket-subscriber/start", {}, JSON.stringify(user));
  }

  finishClass(user: User[]) {
    this.stompClient.send("/socket-subscriber/end", {}, JSON.stringify(user));
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

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      switch (messageResult.operacao) {
        case 1:

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

          break;
        case 2:
          this.workspaceRequired.emit("Workspace Required!");

          break;
        case 3:
          this.workspaceReceived.emit(messageResult.message);
          break;
        case 4:
          this.classStarted.emit("Class started!");

          break;
        case 5:
          this.classFinished.emit("Class finished!");

          break;

        case 6:
          let arrayMessage = this.mensagensMap.get(Number(messageResult.fromId));
          arrayMessage.needHelp = true;
          this.mensagensMap.set(messageResult.toId, arrayMessage);
          
          break;
        default:
          this.toastr.showError('Erro de comunicação, operação não encontrada!');

          break;
      }
    }
  }
}

class MessageForm {
  mensagem: string;
}
