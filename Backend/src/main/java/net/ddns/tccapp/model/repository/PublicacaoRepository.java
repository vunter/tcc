package net.ddns.tccapp.model.repository;

import net.ddns.tccapp.model.entity.Publicacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {

    Optional<List<Publicacao>> findAllByTurmaIdOrderByDataDesc(Long idTurma);

    @Query(nativeQuery = true, value = "SELECT case when (count(p.REPLIES_ID) = 0)  then true else false end FROM PUBLICACAO_REPLIES p WHERE p.REPLIES_ID = ?1")
    boolean isReply(Long id);
}
