package br.com.tcc.model.vo.socket;

public class Message {

    private String message;
    private String fromId;
    private String toId;
    private Boolean takePrint;

    public Message() {
    }

    public Message(String message, String fromId, String toId, Boolean takePrint) {
        this.message = message;
        this.fromId = fromId;
        this.toId = toId;
        this.takePrint = takePrint;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFromId() {
        return fromId;
    }

    public void setFromId(String fromId) {
        this.fromId = fromId;
    }

    public String getToId() {
        return toId;
    }

    public void setToId(String toId) {
        this.toId = toId;
    }

    public Boolean getTakePrint() {
        return takePrint;
    }

    public void setTakePrint(Boolean takePrint) {
        this.takePrint = takePrint;
    }
}
