package net.ddns.tccapp.model.service;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.RespostaDTO;
import net.ddns.tccapp.model.entity.*;
import net.ddns.tccapp.model.repository.RespostaRepository;
import net.ddns.tccapp.utils.aula.XMLUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RespostaService {

    private final RespostaRepository repository;
    private final EntityManager entityManager;
    private final ModelMapper modelMapper;

    public Resposta salvar(RespostaDTO dto) {
        dto.setPrint(XMLUtils.removeIdFromXml(dto.getPrint()));
        return repository.save(modelMapper.map(dto, Resposta.class));
    }

    public List<RespostaDTO> findAllByAulaID(Long idAula) {
        return repository.findAllByAulaId(idAula).stream()
                .map(r -> modelMapper.map(r, RespostaDTO.class))
                .collect(Collectors.toList());
    }

    public List<RespostaDTO> findAllByProfessorResponsavel(Long idProfessor) {
        JPAQuery<Resposta> query = new JPAQuery<>(entityManager);

        QProfessor professor = QProfessor.professor;
        QAula aula = QAula.aula;
        QTurma turma = QTurma.turma;
        QResposta resposta = QResposta.resposta1;

        query.from(resposta)
                .join(resposta.aula, aula)
                .join(aula.turma, turma)
                .join(turma.professor, professor)
                .where(aula.finalizada.eq(true)
                        .and(professor.id.eq(idProfessor))
                        .and(turma.professor.id.eq(idProfessor))
                )
                .orderBy(aula.dataAula.asc());
        return query.fetch().stream()
                .map(a -> modelMapper.map(a, RespostaDTO.class))
                .collect(Collectors.toList());
    }
}
