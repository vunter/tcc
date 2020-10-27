package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.repository.AvaliacaoRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository repository;

}
