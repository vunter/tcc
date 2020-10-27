package net.ddns.tccapp.model.vo.socket;

public class PrintCanvas {

    private String originId;
    private String targetId;
    private String base64Image;


    public PrintCanvas(String originId, String targetId, String base64Image) {
        this.originId = originId;
        this.targetId = targetId;
        this.base64Image = base64Image;
    }

    public String getOriginId() {
        return originId;
    }

    public void setOriginId(String originId) {
        this.originId = originId;
    }

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public String getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }
}
