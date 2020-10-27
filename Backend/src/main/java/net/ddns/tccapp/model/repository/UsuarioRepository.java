package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUser(String user);

    Optional<Usuario> findByEmail(String s);
}
