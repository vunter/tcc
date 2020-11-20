package net.ddns.tccapp.utils.converters;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Time;

public class SqlTimeDeserializer extends JsonDeserializer<Time> {
    @Override
    public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        return Time.valueOf(jsonParser.getValueAsString() + ":00");
    }
}
