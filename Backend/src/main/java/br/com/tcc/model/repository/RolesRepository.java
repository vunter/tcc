package br.com.tcc.model.repository;

import br.com.tcc.model.entity.Role;
import br.com.tcc.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RolesRepository extends JpaRepository<Role, Long> {

    Set<Role> findByUsuario(Usuario usuario);


}
