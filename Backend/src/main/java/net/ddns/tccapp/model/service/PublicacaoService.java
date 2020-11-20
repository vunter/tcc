package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.PublicacaoDTO;
import net.ddns.tccapp.model.entity.Publicacao;
import net.ddns.tccapp.model.repository.PublicacaoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PublicacaoService {

    private final PublicacaoRepository repository;
    private final ModelMapper modelMapper;

    public Publicacao salvar(PublicacaoDTO dto) {

        var pub = modelMapper.map(dto, Publicacao.class);

        return repository.save(pub);
    }

    public List<PublicacaoDTO> findAllByTurmaID(Long idTurma) {
        return repository.findAllByTurmaId(idTurma)
                .map(pub -> pub.stream()
                        .map(p -> modelMapper.map(p, PublicacaoDTO.class))
                        .filter(this::isReply)
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhuma publicação encontrada"));
    }

    public boolean isReply(PublicacaoDTO pub) {
        return repository.isReply(pub.getId());
    }
}
