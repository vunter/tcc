package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.RespostaDTO;
import net.ddns.tccapp.model.entity.Resposta;
import net.ddns.tccapp.model.repository.RespostaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RespostaService {

    private final RespostaRepository repository;
    private final ModelMapper mapper;

    public Resposta salvar(RespostaDTO dto) {
        return repository.save(mapper.map(dto, Resposta.class));
    }

}
