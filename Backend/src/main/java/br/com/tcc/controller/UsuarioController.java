package br.com.tcc.controller;

import br.com.tcc.model.entity.Professor;
import br.com.tcc.model.entity.Usuario;
import br.com.tcc.model.service.UsuarioService;
import br.com.tcc.model.vo.UserVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/usuario")
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

    @GetMapping("user")
    @ResponseBody
    public UserVO findByUsuario(@RequestParam("username") String usuario) {
        return usuarioService.findByUser(usuario);
    }

    @GetMapping("{id}")
    public Usuario findById(@PathVariable("id") Long id) {
        return usuarioService.findById(id);
    }



}
