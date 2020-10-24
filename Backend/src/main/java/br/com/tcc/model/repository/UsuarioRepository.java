package br.com.tcc.model.repository;

import br.com.tcc.model.entity.Role;
import br.com.tcc.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUser(String user);

    Optional<Usuario> findByEmail(String s);
}
