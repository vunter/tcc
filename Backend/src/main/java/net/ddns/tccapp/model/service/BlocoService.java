package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.BlocoDTO;
import net.ddns.tccapp.model.entity.Bloco;
import net.ddns.tccapp.model.repository.BlocoRepository;
import net.ddns.tccapp.utils.aula.XMLUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlocoService {

    private final BlocoRepository repository;
    private final AulaService aulaService;
    private final ModelMapper modelMapper;

    public Bloco salvar(BlocoDTO dto) {

        dto.setConteudo(XMLUtils.removeIdFromXml(dto.getConteudo()));

        return repository.save(modelMapper.map(dto, Bloco.class));
    }

    public List<BlocoDTO> findAllByProfessorId(Long professorId) {
        return repository.findAllByProfessorCriadorId(professorId)
                .map(bList -> bList.stream()
                        .map(b -> modelMapper.map(b, BlocoDTO.class))
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Não existem blocos criados por este professor!"));
    }

    public List<BlocoDTO> findAllByAulaId(Long idAula) {
        return aulaService.findBlocosByAula(idAula);
    }

    public Bloco findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bloco não encontrado"));
    }
}
