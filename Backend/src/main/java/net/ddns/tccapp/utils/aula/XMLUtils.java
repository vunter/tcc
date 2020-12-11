package net.ddns.tccapp.utils.aula;

import lombok.experimental.UtilityClass;

@UtilityClass
public class XMLUtils {

    public String removeIdFromXml(String xml) {
        return xml.replaceAll("id=\"[^\"]*\"", "");
    }

}
