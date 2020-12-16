package net.ddns.tccapp.model.service;


import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.BlocoDTO;
import net.ddns.tccapp.model.dto.ProfessorDTO;
import net.ddns.tccapp.model.entity.*;
import net.ddns.tccapp.model.repository.AulaRepository;
import net.ddns.tccapp.utils.converters.DuracaoConverter;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository repository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;

    public AulaDTO findOneById(Long id) {
        return repository.findById(id)
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não encontrada aula com id " + id));
    }

    public List<Aula> findAll() {
        return repository.findAll();
    }

    public List<AulaDTO> findAllByTurma(Long id) {
        return repository.findAllByTurmaIdAndIniciadaFalseOrderByDataAula(id)
                .map(aulas -> aulas.stream()
                        .map(aula -> modelMapper.map(aula, AulaDTO.class))
                        .collect(Collectors.toList())
                )
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não existem aulas programadas para esta turma"));
    }

    public AulaDTO salvar(Aula aula) {

        aula.setDuracao(DuracaoConverter.minuteToSeconds(aula.getDuracao()));

        return modelMapper.map(repository.save(aula), AulaDTO.class);
    }

    public AulaDTO edit(AulaDTO dto) {
        return repository.findById(dto.getId())
                .map(a -> {
                    dto.setId(a.getId());
                    return modelMapper.map(repository.save(modelMapper.map(dto, Aula.class)), AulaDTO.class);
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao editar aula"));
    }

    public ProfessorDTO findProfessorByAula(Long aulaId) {
        return repository.findProfessorByAula(aulaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professor não encontrado."));
    }

    public List<BlocoDTO> findBlocosByAula(Long idAula) {
        return repository.findBlocosById(idAula).stream()
                .map(b -> modelMapper.map(b, BlocoDTO.class))
                .collect(Collectors.toList());
    }

    public Aula finalizarAula(AulaDTO dto) {

        return repository.findById(dto.getId())
                .map(a -> {
                    dto.setId(a.getId());
                    return repository.save(modelMapper.map(dto, Aula.class));
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao finalizar aula"));

    }

    public Aula iniciarAula(Long idAula) {
        return repository.findById(idAula)
                .map(a -> {
                    a.setIniciada(true);
                    return repository.save(a);
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao iniciar aula"));
    }

    public List<AulaDTO> findNext5ByAlunoId(Long id) {
        JPAQuery<Aula> query = new JPAQuery<>(entityManager);

        QAluno aluno = QAluno.aluno;
        QAula aula = QAula.aula;
        QTurma turma = QTurma.turma;

        query.from(aula)
                .join(aula.turma, turma)
                .join(turma.alunos, aluno)
                .where(
                        aula.finalizada.eq(false)
                                .and(aluno.id.eq(id))
                )
                .orderBy(aula.dataAula.asc())
                .limit(5);
        return query.fetch().stream()
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .collect(Collectors.toList());
    }

    public List<AulaDTO> listarAulasAoVivoPorAlunoId(Long id) {
        JPAQuery<Aula> query = new JPAQuery<>(entityManager);

        QAluno aluno = QAluno.aluno;
        QAula aula = QAula.aula;
        QTurma turma = QTurma.turma;
        QResposta resposta = QResposta.resposta1;

        var sub = JPAExpressions.select(resposta.aula).from(resposta)
                .join(resposta.aula, aula)
                .where(resposta.aluno.id.eq(id));

        query.from(aula)
                .join(aula.turma, turma)
                .join(turma.alunos, aluno)
                .where(aula.finalizada.eq(false)
                        .and(aula.iniciada.eq(true))
                        .and(aluno.id.eq(id))
                        .and(aula.notIn(sub))
                )
                .orderBy(aula.dataAula.asc());
        return query.fetch().stream()
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .collect(Collectors.toList());
    }

    public AulaDTO findIniciadaPorTurmaId(Long id) {
        return repository.findByTurmaIdAndIniciadaTrueAndFinalizadaFalse(id)
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma aula iniciada"));
    }

    public void delete(Long id) {

        repository.findById(id)
                .map(a -> {
                    repository.delete(a);
                    return a;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não foi possível deletar aula!"));

    }

    public List<AulaDTO> findAulasByProfessor(Long idProfessor) {
        JPAQuery<Aula> query = new JPAQuery<>(entityManager);

        QProfessor professor = QProfessor.professor;
        QAula aula = QAula.aula;
        QTurma turma = QTurma.turma;

        query.from(aula)
                .join(aula.turma, turma)
                .join(turma.professor, professor)
                .where(aula.finalizada.eq(false)
                        .and(professor.id.eq(idProfessor)))
                .orderBy(aula.dataAula.asc());
        return query.fetch().stream()
                .map(a -> modelMapper.map(a, AulaDTO.class))
                .collect(Collectors.toList());
    }
}
