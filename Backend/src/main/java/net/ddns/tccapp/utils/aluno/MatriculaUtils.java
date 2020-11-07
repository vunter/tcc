package net.ddns.tccapp.utils.aluno;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.util.Random;

@UtilityClass
public class MatriculaUtils {

    public String gerarMatricula() {
        StringBuilder matricula = new StringBuilder();
        Random random = new Random();
        LocalDate date = LocalDate.now();
        matricula.append("A");
        matricula.append(random.nextInt(999999));
        matricula.append(date.getMonthValue());
        matricula.append(date.getYear());


        return matricula.toString();
    }
}
