package net.ddns.tccapp.model.vo.socket;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TipoOperacaoEnum {

    COMMON_MESSAGE(1L, "Common Message, chat comunication"),
    REQUEST_WORKSPACE(2L, "Request Workspace from student"),
    RESPONSE_WORKSPACE(3L, "Return of REQUEST_WORKSPACE"),
    START_CLASS(4L, "Start class timer"),
    END_CLASS(5L, "End class and stop timer"),
    NEED_HELP(6L, "Student need help"),
    ;

    private Long cod;
    private String description;

}
