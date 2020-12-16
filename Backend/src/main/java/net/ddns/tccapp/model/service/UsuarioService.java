package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.UsuarioDTO;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Role;
import net.ddns.tccapp.model.entity.Usuario;
import net.ddns.tccapp.model.repository.UsuarioRepository;
import net.ddns.tccapp.model.vo.UserVO;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    public static final String USUARIO_NAO_ENCONTRADO = "Usuário não encontrado!";
    private final UsuarioRepository repository;
    private final AlunoService alunoService;
    private final ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario user = repository.findByUser(username).orElseThrow(() -> new UsernameNotFoundException("Usuário e/ou senha incorretos!"));

        return User.builder()
                .username(user.getUser())
                .password(user.getPassword())
                .roles(user.getRoles()
                        .stream()
                        .map(Role::getNome)
                        .toArray(String[]::new))
                .build();
    }

    public UserVO salvar(UserVO usuario) {
        Usuario user;

        if (!StringUtils.isEmpty(usuario.getCpf())) {
            user = new Professor(usuario);
        } else {
            user = new Aluno(usuario);
            alunoService.verificaMatriculaUnica((Aluno) user);
        }

        return new UserVO(repository.save(user));
    }

    public UserVO findByUser(String s) {

        return repository
                .findByUser(s)
                .map(UserVO::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USUARIO_NAO_ENCONTRADO));
    }


    public Boolean isUserPresent(String s) {
        return repository.findByUser(s).isPresent();
    }

    public Boolean isEmailPresente(String s) {
        return repository.findByEmail(s).isPresent();
    }


    public UsuarioDTO findByIdDto(Long id) {
        return repository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USUARIO_NAO_ENCONTRADO));

    }

    public Usuario findByIdEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USUARIO_NAO_ENCONTRADO));
    }

    private UsuarioDTO convertToDto(Usuario user) {
        return modelMapper.map(user, UsuarioDTO.class);
    }

    private Usuario convertToEntity(UsuarioDTO dto) {

        return modelMapper.map(dto, Usuario.class);
    }

}
