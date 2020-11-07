import { Message } from './../../entity/Message';
import { environment } from './../../../environments/environment';
import { ToastService } from './../../toast.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private serverUrl = environment.url + 'socket';
  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Message[] = [];
  userId;
  constructor(private toastr: ToastService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    });
    this.initializeWebSocketConnection();

  }
  sendMessageUsingSocket(messageCustom? : string, takePrint? : boolean, toId? : string) {
    if (this.form.valid) {
      let message: Message = { message: messageCustom ? messageCustom : this.form.value.message, fromId: this.userForm.value.fromId, toId: toId ? toId : this.userForm.value.toId, takePrint: takePrint ? takePrint : true };
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
    }
  }
  /*
  sendMessageUsingRest() {
    if (this.form.valid) {
      let message: Message = { message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId, takePrint: true }
      this.socketService.post(message).subscribe(res => {
        console.log(res);
      })
    }
  }
*/
  sendPrintRequest() {
    this.stompClient.send("/socket-subscriber/print", {}, JSON.stringify({originId: this.userId, targetId: this.userForm.value.toId}))
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
      this.stompClient.subscribe("/socket-publisher/" + this.userForm.value.fromId, (message) => {
        this.handleResult(message);
      });
      this.openPrintConnection();
    }
  }

  openPrintConnection() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.userId = this.userForm.value.fromId;
      this.stompClient.subscribe("/print-socket/" + this.userId, (request) => {
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
