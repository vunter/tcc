package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.TurmaDTO;
import net.ddns.tccapp.model.service.TurmaService;
import net.ddns.tccapp.model.service.UsuarioService;
import net.ddns.tccapp.model.vo.UserVO;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioService usuarioService;
    private final TurmaService turmaService;

    @PostMapping("salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public UserVO salvar(@RequestBody @Valid UserVO usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioService.salvar(usuario);
    }

    @GetMapping("turmas")
    @ResponseStatus(HttpStatus.OK)
    public List<TurmaDTO> listPublicTurmas() {
        return turmaService.findAllPublic();
    }



}
