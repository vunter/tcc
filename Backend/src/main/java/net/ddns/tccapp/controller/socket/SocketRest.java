package net.ddns.tccapp.controller.socket;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AlunoDTO;
import net.ddns.tccapp.model.vo.socket.Message;
import net.ddns.tccapp.model.vo.socket.TipoOperacaoEnum;
import net.ddns.tccapp.utils.aula.XMLUtils;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/socket")
public class SocketRest {

    private static final String SOCKET_PUBLISHER = "/socket-publisher/";
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/send/message")
    public Message useSocketCommunication(Message message) {
        if (message != null) {
            message.setOperacao(TipoOperacaoEnum.COMMON_MESSAGE.getCod());

            if (message.getToId() != null &&
                    Boolean.FALSE.equals(Long.valueOf(0L).equals(message.getToId().longValue()))) {
                this.simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + message.getToId(), message);
            } else {
                this.simpMessagingTemplate.convertAndSend("/socket-publisher", message);
            }
        }
        return message;
    }

    @MessageMapping("/xmlAluno")
    public void requestXmlAluno(Long idAluno) {
        var message = new Message();
        message.setOperacao(TipoOperacaoEnum.REQUEST_WORKSPACE.getCod());

        simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + idAluno, message);
    }

    @MessageMapping("/returnXml")
    public Message returnXml(Message print) {
        print.setOperacao(TipoOperacaoEnum.RESPONSE_WORKSPACE.getCod());

        print.setMessage(XMLUtils.removeIdFromXml(print.getMessage()));
        simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + print.getToId(), print);
        return print;
    }

    @MessageMapping("/start")
    public void startAula(List<AlunoDTO> alunos) {
        var message = new Message();
        message.setOperacao(TipoOperacaoEnum.START_CLASS.getCod());

        alunos.forEach(a -> {
            message.setToId(a.getId());
            simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + a.getId(), message);
        });
    }

    @MessageMapping("/end")
    public void endAula(List<AlunoDTO> alunos) {
        var message = new Message();
        message.setOperacao(TipoOperacaoEnum.END_CLASS.getCod());

        alunos.forEach(a -> {
            message.setToId(a.getId());
            simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + a.getId(), message);
        });
    }

    @MessageMapping("/askHelp")
    public void askHelp(Message message) {
        message.setOperacao(TipoOperacaoEnum.NEED_HELP.getCod());

        simpMessagingTemplate.convertAndSend(SOCKET_PUBLISHER + message.getToId(), message);
    }
}
