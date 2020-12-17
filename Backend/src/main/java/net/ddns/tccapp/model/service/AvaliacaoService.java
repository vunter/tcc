package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AvaliacaoDTO;
import net.ddns.tccapp.model.entity.Avaliacao;
import net.ddns.tccapp.model.repository.AvaliacaoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository repository;
    private final ModelMapper modelMapper;

    public Avaliacao salvar(AvaliacaoDTO dto) {
        return repository.save(modelMapper.map(dto, Avaliacao.class));
    }

    public List<AvaliacaoDTO> findAllByAluno(Long idAluno) {
        return repository.findAllByAlunoId(idAluno)
                .stream()
                .map(a -> modelMapper.map(a, AvaliacaoDTO.class))
                .collect(Collectors.toList());
    }
}
