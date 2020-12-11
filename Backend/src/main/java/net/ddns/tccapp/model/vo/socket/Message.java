package net.ddns.tccapp.model.vo.socket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public @Data
class Message {

    private Long operacao;
    private String message;
    private Long fromId;
    private Long toId;
    private Boolean takePrint;

}
