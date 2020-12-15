package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AlunoDTO;
import net.ddns.tccapp.model.entity.Aluno;
import net.ddns.tccapp.model.repository.AlunoRepository;
import net.ddns.tccapp.utils.aluno.MatriculaUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository repository;
    private final ModelMapper mapper;

    public Aluno salvar(Aluno aluno) {

        return repository.save(aluno);
    }

    public Aluno findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não foi encontrado nenhum aluno cadastrado com ID " + id));
    }

    public Aluno edit(AlunoDTO aluno) {
        return repository.findById(aluno.getId())
                .map(a -> {
                    aluno.setId(a.getId());
                    return salvar(mapper.map(aluno, Aluno.class));
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorreu um erro ao salvar modificações"));

    }

    public void deleteAluno(Long id) {
        repository.findById(id)
                .map(a -> {
                    repository.delete(a);
                    return a;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorreu um erro ao deletar aluno"));
    }

    public List<AlunoDTO> listAll() {
        return repository.findAll()
                .stream()
                .map(a -> mapper.map(a, AlunoDTO.class))
                .collect(Collectors.toList());
    }

    public boolean isMatriculaPresent(String matricula) {
        return repository.findByMatricula(matricula).isPresent();
    }

    public void verificaMatriculaUnica(Aluno aluno) {
        boolean isMatriculaUnique = true;

        while (isMatriculaUnique) {

            isMatriculaUnique = isMatriculaPresent(aluno.getMatricula());

            if (Boolean.FALSE.equals(isMatriculaUnique)) {
                aluno.setMatricula(MatriculaUtils.gerarMatricula());
            }
        }

    }

    public List<AlunoDTO> findAllByTurmaId(Long turmaId) {
        return repository.findAllByTurmasIdOrderByNomeAsc(turmaId)
                .map(alunos -> alunos.stream()
                        .map(a -> mapper.map(a, AlunoDTO.class))
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma turma encontrada"));
    }
}
