package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.UsuarioDTO;
import net.ddns.tccapp.model.service.UsuarioService;
import net.ddns.tccapp.model.vo.UserVO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("user")
    @ResponseBody
    public UserVO findByUsuario(@RequestParam("username") String usuario) {
        return usuarioService.findByUser(usuario);
    }

    @GetMapping("{id}")
    public UsuarioDTO findById(@PathVariable("id") Long id) {
        return usuarioService.findByIdDto(id);
    }


}
