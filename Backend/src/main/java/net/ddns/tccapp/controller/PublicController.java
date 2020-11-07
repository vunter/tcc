package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Usuario;
import net.ddns.tccapp.model.service.UsuarioService;
import net.ddns.tccapp.model.vo.UserVO;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioService usuarioService;


    @PostMapping("salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar(@RequestBody @Valid UserVO usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioService.salvar(usuario);
    }

}
