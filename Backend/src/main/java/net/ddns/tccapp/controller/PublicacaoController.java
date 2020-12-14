package net.ddns.tccapp.controller;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.PublicacaoDTO;
import net.ddns.tccapp.model.entity.Publicacao;
import net.ddns.tccapp.model.service.PublicacaoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publicacao")
@RequiredArgsConstructor
public class PublicacaoController {

    private final PublicacaoService service;


    @PostMapping
    public Publicacao salvar(@RequestBody PublicacaoDTO dto) {
    return service.salvar(dto);
    }

    @PutMapping("save/reply")
    public Publicacao saveReplies(@RequestBody PublicacaoDTO publicacaoMain, @RequestParam("idPubPai") Long idPubPai) {
        return service.updateReplies(publicacaoMain, idPubPai);
    }
}
