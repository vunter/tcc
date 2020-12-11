package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.RespostaDTO;
import net.ddns.tccapp.model.entity.Resposta;
import net.ddns.tccapp.model.repository.RespostaRepository;
import net.ddns.tccapp.utils.aula.XMLUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RespostaService {

    private final RespostaRepository repository;
    private final ModelMapper mapper;

    public Resposta salvar(RespostaDTO dto) {
        dto.setPrint(XMLUtils.removeIdFromXml(dto.getPrint()));
        return repository.save(mapper.map(dto, Resposta.class));
    }

    public List<RespostaDTO> findAllByAulaID(Long idAula) {
        return repository.findAllByAulaId(idAula).stream()
                .map(r -> mapper.map(r, RespostaDTO.class))
                .collect(Collectors.toList());
    }

}
