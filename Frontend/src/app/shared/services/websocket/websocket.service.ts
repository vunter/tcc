import { Global } from '../../GlobalUse';
import { ToastService } from 'src/app/toast.service';
import { environment } from './../../../../environments/environment';
import { Message } from './../../entity/Message';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client'
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private serverUrl = environment.url + 'socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;

  messages: Message[] = [];
  constructor(
    private toastr: ToastService,
    private globals: Global
    ) { }

  ngOnInit(): void {

  }
  sendMessageUsingSocket(messageCustom : string, toId : number, takePrint? : boolean) {

      let message: Message = { message: messageCustom, fromId: this.globals.user.id, toId: toId, takePrint: takePrint ? takePrint : true };
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));

  }

  sendPrintRequest(targetid) {
    this.stompClient.send("/socket-subscriber/print", {}, JSON.stringify({originId: this.globals.user.id, targetId: targetid}))
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }
  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if(this.isLoaded) {
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
    this.stompClient.send("/socket-subscriber/printReturn", {}, JSON.stringify({originId: canvasObj.targetId, targetId: canvasObj.originId, base64Image: canvasObj.base64Image}))
  }

  handlePrint(request) {
    console.log(request);
    if(request.body) {
      let requestHandled = JSON.parse(request.body);
      console.log(requestHandled);
      if (!requestHandled.base64Image) {

      html2canvas(document.querySelector("#capture")).then(canvas => {
        requestHandled.base64Image = canvas.toDataURL();
        this.sendPrint(requestHandled);
      });
    } else {
        var img  = document.createElement('img');
          img.setAttribute('download','myImage.png');
          img.src  = requestHandled.base64Image;
          document.body.appendChild(img);
    }
    }
  }

  handleResult(message) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.showSuccess("new message received", 5000);

    }
  }
}
