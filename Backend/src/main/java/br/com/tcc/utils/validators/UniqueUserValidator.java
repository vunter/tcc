package br.com.tcc.utils.validators;

import br.com.tcc.model.annotations.UniqueUser;
import br.com.tcc.model.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUserValidator implements ConstraintValidator<UniqueUser, String> {

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        return !usuarioService.isUserPresent(s);
    }
}
