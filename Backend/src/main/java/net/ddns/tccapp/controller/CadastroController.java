package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Usuario;
import net.ddns.tccapp.model.service.AlunoService;
import net.ddns.tccapp.model.service.ProfessorService;
import net.ddns.tccapp.model.service.UsuarioService;
import net.ddns.tccapp.model.vo.UserVO;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/cadastro")
@RequiredArgsConstructor
public class CadastroController {


}
