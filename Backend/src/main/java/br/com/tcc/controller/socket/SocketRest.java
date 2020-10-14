package br.com.tcc.controller.socket;

import br.com.tcc.model.vo.socket.Message;
import br.com.tcc.model.vo.socket.PrintCanvas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/api/socket")
public class SocketRest {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @PutMapping
    public ResponseEntity<?> useSimpleRest(@RequestBody Map<String, String> message) {
        if (message.containsKey("message")) {
            if (message.containsKey("told") && message.get("toId") != null && Boolean.FALSE.equals(message.get("toId").equals(""))) {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.get("toId"), message);
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.get("fromId"), message);

            } else {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.get("fromId"), message);
            }
            return new ResponseEntity<>(message, new HttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @MessageMapping("/send/message")
    public Message useSocketCommunication(Message message) {
        if (message != null) {
            if (message.getToId() != null && !message.getToId().isBlank()) {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher/" + message.getToId(), message);
                //this.simpMessagingTemplate.convertAndSend("/socket-publisher/"+message.getFromId(), message);
            } else {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher", message);
            }
        }
        return message;
    }

    @MessageMapping("/print")
    public PrintCanvas getCanvasImage(PrintCanvas printCanvas) {
        simpMessagingTemplate.convertAndSend("/print-socket/" + printCanvas.getTargetId(), printCanvas);
        return printCanvas;
    }

    @MessageMapping("/printReturn")
    public PrintCanvas handleReceivedPrint(PrintCanvas printCanvas) {
        simpMessagingTemplate.convertAndSend("/print-socket/" + printCanvas.getTargetId(), printCanvas);
        return printCanvas;
    }
}
