package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Publicacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {
}
