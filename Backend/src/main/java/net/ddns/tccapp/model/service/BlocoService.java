package net.ddns.tccapp.model.service;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.repository.BlocoRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlocoService {

    private final BlocoRepository repository;
}
