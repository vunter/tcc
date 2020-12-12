package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.PublicacaoDTO;
import net.ddns.tccapp.model.dto.TurmaDTO;
import net.ddns.tccapp.model.entity.Turma;
import net.ddns.tccapp.model.repository.TurmaRepository;
import net.ddns.tccapp.utils.turma.TurmaUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TurmaService {

    private final TurmaRepository repository;
    private final ModelMapper modelMapper;
    private final ProfessorService professorService;
    private final PublicacaoService publicacaoService;

    public Turma salvar(TurmaDTO turmaDTO) {

        var turma = modelMapper.map(turmaDTO, Turma.class);
        turma.setCodigo(gerarCodigoTurma());

        return repository.save(turma);
    }

    public TurmaDTO findOneById(Long id) {
        return repository.findById(id)
                .map(turma -> {
                    var turmaDTO = modelMapper.map(turma, TurmaDTO.class);
                    turmaDTO.setProfessorUserId(turma.getProfessor().getId());
                    return turmaDTO;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma com ID " + id + " não encontrada!"));
    }

    public Turma findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma com ID " + id + " não encontrada!"));
    }

    public String gerarCodigoTurma() {
        String codigo = "";
        boolean isCodigoUniqueBoolean = true;

        while (isCodigoUniqueBoolean) {
            isCodigoUniqueBoolean = isCodigoUnique(codigo);
            if (Boolean.FALSE.equals(isCodigoUniqueBoolean)) {
                codigo = TurmaUtils.gerarCodigoAula();
            }
        }
        return codigo;
    }

    public boolean isCodigoUnique(String codigo) {
        return repository.findByCodigo(codigo).isPresent();
    }

    public List<TurmaDTO> findAllPublic() {
        return repository.findAllByPublico(Boolean.TRUE)
                .map(turmas -> turmas.stream()
                        .map(t -> {
                            var turma = modelMapper.map(t, TurmaDTO.class);
                            turma.setProfessorUserId(t.getProfessor().getId());
                            return turma;
                        })
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma turma encontrada"));
    }

    public List<PublicacaoDTO> listPublicacoesTurma(Long idTurma) {

        return publicacaoService.findAllByTurmaID(idTurma);
    }

    public List<TurmaDTO> listTurmasByAlunoId(Long idUser) {
        return repository.findAllByAlunosId(idUser)
                .map(turmas -> turmas.stream()
                .map(t -> modelMapper.map(t, TurmaDTO.class))
                .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma turma encontrada"));
    }

    public List<TurmaDTO> listTurmasByProfessorId(Long idUser) {
        return repository.findAllByProfessorId(idUser)
                .map(turmas -> turmas.stream()
                .map(t -> modelMapper.map(t, TurmaDTO.class))
                .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma turma encontrada"));
    }
}

