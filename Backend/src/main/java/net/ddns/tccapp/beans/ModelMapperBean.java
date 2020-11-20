package net.ddns.tccapp.beans;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.AulaDTO;
import net.ddns.tccapp.model.dto.ProfessorDTO;
import net.ddns.tccapp.model.dto.PublicacaoDTO;
import net.ddns.tccapp.model.dto.TurmaDTO;
import net.ddns.tccapp.model.entity.Aula;
import net.ddns.tccapp.model.entity.Professor;
import net.ddns.tccapp.model.entity.Publicacao;
import net.ddns.tccapp.model.entity.Turma;
import net.ddns.tccapp.model.repository.ProfessorRepository;
import net.ddns.tccapp.model.repository.TurmaRepository;
import net.ddns.tccapp.model.repository.UsuarioRepository;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class ModelMapperBean {

    private final UsuarioRepository usuarioRepository;
    private final TurmaRepository turmaRepository;
    private final ProfessorRepository professorRepository;

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addConverter(publicacaoDTOPublicacaoConverter());
        modelMapper.addConverter(turmaDTOtoEntityConverter());
        modelMapper.addConverter(turmaToDtoConverter());
        modelMapper.addConverter(professorToDtoConverter());
        modelMapper.addConverter(aulaToDtoConverter());
        modelMapper.addConverter(aulaDTOToEntityConverter());

        return modelMapper;
    }

    private Converter<PublicacaoDTO, Publicacao> publicacaoDTOPublicacaoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Publicacao convert(PublicacaoDTO publicacaoDTO) {
                Publicacao pub = new Publicacao();

                pub.setAutor(usuarioRepository.findById(publicacaoDTO.getAutor().getId()).orElse(null));
                pub.setTurma(turmaRepository.findById(publicacaoDTO.getTurmaId()).orElse(null));
                pub.setConteudo(publicacaoDTO.getConteudo());

                return pub;
            }
        };
    }

    private Converter<TurmaDTO, Turma> turmaDTOtoEntityConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Turma convert(TurmaDTO turmaDTO) {
                var turma = new Turma();
                turma.setProfessor(professorRepository.findById(turmaDTO.getProfessorUserId()).orElse(null));
                turma.setDescricao(turmaDTO.getDescricao());
                turma.setCapacidade(turmaDTO.getCapacidade());
                return turma;
            }
        };
    }

    private Converter<Turma, TurmaDTO> turmaToDtoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected TurmaDTO convert(Turma turma) {
                var turmaDTO = new TurmaDTO();
                turmaDTO.setProfessorUserId(turma.getProfessor().getId());
                turmaDTO.setDescricao(turma.getDescricao());
                turmaDTO.setCapacidade(turma.getCapacidade());
                turmaDTO.setCodigo(turma.getCodigo());
                turmaDTO.setPublico(turma.getPublico());
                turmaDTO.setId(turma.getId());

                return turmaDTO;
            }
        };
    }

    private Converter<Professor, ProfessorDTO> professorToDtoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected ProfessorDTO convert(Professor professor) {
                var profDTO = new ProfessorDTO();
                profDTO.setCpf(professor.getCpf());
                profDTO.setEmail(professor.getEmail());
                profDTO.setId(professor.getId());
                profDTO.setUser(professor.getUser());
                profDTO.setRoles(profDTO.getRoles());

                return profDTO;
            }
        };
    }

    private Converter<Aula, AulaDTO> aulaToDtoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected AulaDTO convert(Aula aula) {
                var aulaDTO = new AulaDTO();
                aulaDTO.setId(aula.getId());
                aulaDTO.setTitulo(aula.getTitulo());
                aulaDTO.setObjetivo(aula.getObjetivo());
                aulaDTO.setGabarito(aula.getGabarito());
                aulaDTO.setDuracao(aula.getDuracao());
                aulaDTO.setDataAula(aula.getDataAula());
                aulaDTO.setTurmaId(aula.getTurma().getId());
                return aulaDTO;
            }
        };
    }


    private Converter<AulaDTO, Aula> aulaDTOToEntityConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Aula convert(AulaDTO dto) {
                var aula = new Aula();
                aula.setId(dto.getId());
                aula.setTitulo(dto.getTitulo());
                aula.setObjetivo(dto.getObjetivo());
                aula.setGabarito(dto.getGabarito());
                aula.setDuracao(dto.getDuracao());
                aula.setDataAula(dto.getDataAula());
                aula.setTurma(turmaRepository.findById(dto.getTurmaId()).orElse(null));
                return aula;
            }
        };
    }

}
