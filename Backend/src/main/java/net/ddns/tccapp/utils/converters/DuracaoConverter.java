package net.ddns.tccapp.utils.converters;

import lombok.experimental.UtilityClass;

@UtilityClass
public class DuracaoConverter {

    public Long minuteToSeconds(Long value) {

        return (value * 60);
    }

}
