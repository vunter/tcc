package br.com.tcc.model.service;

import br.com.tcc.model.entity.Role;
import br.com.tcc.model.entity.Usuario;
import br.com.tcc.model.repository.RolesRepository;
import br.com.tcc.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
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
        //user.setRoles(repository.findRoleByUsuario(user).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role não existe")));

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

    public Usuario findByUser(String s) {

        return repository
                .findByUser(s)
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
