package br.com.tcc.model.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ApiErrors {

    @Getter
    private List<String> erros;

    public ApiErrors(String mensagem) {
        this.erros = Collections.singletonList(mensagem);
    }

}
