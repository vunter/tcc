package br.com.tcc.model.service;

import br.com.tcc.model.repository.BlocoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlocoService {

    private final BlocoRepository repository;
}
