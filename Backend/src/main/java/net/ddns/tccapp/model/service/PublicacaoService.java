package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.repository.PublicacaoRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PublicacaoService {

    private final PublicacaoRepository repository;
}