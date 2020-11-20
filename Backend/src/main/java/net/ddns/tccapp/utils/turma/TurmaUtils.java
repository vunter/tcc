package net.ddns.tccapp.utils.turma;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TurmaUtils {

    public String gerarCodigoAula() {

        int qtdeMaximaCaracteres = 6;

        String[] caracteres = {"0", "1", "b", "2", "4", "5", "6", "7", "8",
                "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
                "x", "y", "z"};

        StringBuilder codigoAula = new StringBuilder();

        for (int i = 0; i < qtdeMaximaCaracteres; i++) {
            int posicao = (int) (Math.random() * caracteres.length);
            codigoAula.append(caracteres[posicao]);
        }
        return codigoAula.toString();
    }

}
