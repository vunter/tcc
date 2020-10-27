package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.entity.Role;
import net.ddns.tccapp.model.entity.Usuario;
import net.ddns.tccapp.model.repository.RolesRepository;
import net.ddns.tccapp.model.repository.UsuarioRepository;
import net.ddns.tccapp.model.vo.UserVO;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repository;
    private final RolesRepository rolesRepository;

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

    public Usuario salvar(Usuario usuario) {

        return repository.save(usuario);
    }

    public UserVO findByUser(String s) {

        return repository
                .findByUser(s)
                .map(UserVO::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));
    }


    public Boolean isUserPresent(String s) {
        return repository.findByUser(s).isPresent();
    }

    public Boolean isEmailPresente(String s) {
        return repository.findByEmail(s).isPresent();
    }


    public Usuario findById(Long id) {
        return repository.findById(id)
                .map(c -> {
                    c.setPassword("");
                    return c;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

    }
}
