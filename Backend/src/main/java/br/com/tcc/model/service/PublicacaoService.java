package br.com.tcc.model.service;

import br.com.tcc.model.repository.PublicacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PublicacaoService {

    private final PublicacaoRepository repository;
}
