package br.com.tcc.controller;

import br.com.tcc.model.entity.Professor;
import br.com.tcc.model.entity.Usuario;
import br.com.tcc.model.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioService usuarioService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar (@RequestBody @Valid Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioService.salvar(usuario);
    }

}
