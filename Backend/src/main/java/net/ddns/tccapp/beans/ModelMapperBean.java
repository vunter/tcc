package net.ddns.tccapp.beans;

import lombok.RequiredArgsConstructor;
import net.ddns.tccapp.model.dto.*;
import net.ddns.tccapp.model.entity.*;
import net.ddns.tccapp.model.repository.*;
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
    private final AlunoRepository alunoRepository;
    private final AulaRepository aulaRepository;

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addConverter(publicacaoDTOPublicacaoConverter());
        modelMapper.addConverter(turmaDTOtoEntityConverter());
        modelMapper.addConverter(turmaToDtoConverter());
        modelMapper.addConverter(professorToDtoConverter());
        modelMapper.addConverter(aulaToDtoConverter());
        modelMapper.addConverter(aulaDTOToEntityConverter());
        modelMapper.addConverter(blocoToDtoConverter());
        modelMapper.addConverter(blocoDTOToEntityConverter());
        modelMapper.addConverter(respostaToDtoConverter());
        modelMapper.addConverter(respostaDTOToEntityConverter());
        modelMapper.addConverter(avaliacaoDTOAvaliacaoConverter());
        modelMapper.addConverter(avaliacaoAvaliacaoDTOConverter());

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
                pub.setData(publicacaoDTO.getData());

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
                turma.setNome(turmaDTO.getNome());
                turma.setDescricao(turmaDTO.getDescricao());
                turma.setCapacidade(turmaDTO.getCapacidade());
                turma.setCodigo(turmaDTO.getCodigo());
                turma.setId(turmaDTO.getId());
                turma.setPublico(turmaDTO.isPublico());

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
                turmaDTO.setNomeProfessor(turma.getProfessor().getNome());
                turmaDTO.setNome(turma.getNome());
                turmaDTO.setDescricao(turma.getDescricao());
                turmaDTO.setCapacidade(turma.getCapacidade());
                turmaDTO.setCodigo(turma.getCodigo());
                turmaDTO.setPublico(turma.getPublico());
                turmaDTO.setId(turma.getId());
                turmaDTO.setQtdAlunosMatriculados(turma.getAlunos() != null ? turma.getAlunos().size() : 0);

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
                aulaDTO.setQuantidadeMaxBlocos(aula.getQuantidadeMaxBlocos());
                aulaDTO.setFinalizada(aula.getFinalizada());
                aulaDTO.setIniciada(aula.getIniciada());
                aulaDTO.setNomeProfessor(aula.getTurma().getProfessor().getNome());
                aulaDTO.setTurma(modelMapper().map(aula.getTurma(), TurmaDTO.class));
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
                aula.setQuantidadeMaxBlocos(dto.getQuantidadeMaxBlocos());
                aula.setFinalizada(dto.getFinalizada());
                aula.setIniciada(dto.getIniciada());
                aula.setTurma(turmaRepository.findById(dto.getTurmaId() != null ? dto.getTurmaId() : dto.getTurma().getId())
                        .orElse(null));
                return aula;
            }
        };
    }

    private Converter<BlocoDTO, Bloco> blocoDTOToEntityConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Bloco convert(BlocoDTO dto) {
                var bloco = new Bloco();
                bloco.setId(dto.getId());
                bloco.setTitulo(dto.getTitulo());
                bloco.setConteudo(dto.getConteudo());
                bloco.setProfessorCriador(professorRepository.findById(dto.getProfessorId()).orElse(null));
                return bloco;
            }
        };
    }

    private Converter<Bloco, BlocoDTO> blocoToDtoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected BlocoDTO convert(Bloco bloco) {
                var dto = new BlocoDTO();
                dto.setId(bloco.getId());
                dto.setTitulo(bloco.getTitulo());
                dto.setConteudo(bloco.getConteudo());
                dto.setProfessorId(bloco.getProfessorCriador().getId());
                return dto;
            }
        };
    }

    private Converter<Resposta, RespostaDTO> respostaToDtoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected RespostaDTO convert(Resposta resposta) {
                var dto = new RespostaDTO();
                dto.setId(resposta.getId());
                dto.setResposta(resposta.getResposta());
                dto.setAlunoId(resposta.getAluno().getId());
                dto.setAulaId(resposta.getAula().getId());
                dto.setPrint(resposta.getPrint());
                dto.setAula(modelMapper().map(resposta.getAula(), AulaDTO.class));
                dto.setAluno(modelMapper().map(resposta.getAluno(), AlunoDTO.class));
                return dto;
            }
        };
    }

    private Converter<RespostaDTO, Resposta> respostaDTOToEntityConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Resposta convert(RespostaDTO dto) {
                var resposta = new Resposta();
                resposta.setId(dto.getId());
                resposta.setResposta(dto.getResposta());
                resposta.setAluno(alunoRepository.findById(dto.getAlunoId()).orElse(null));
                resposta.setAula(aulaRepository.findById(dto.getAulaId()).orElse(null));
                resposta.setPrint(dto.getPrint());
                return resposta;
            }
        };
    }

    private Converter<AvaliacaoDTO, Avaliacao> avaliacaoDTOAvaliacaoConverter() {
        return new AbstractConverter<>() {
            @Override
            protected Avaliacao convert(AvaliacaoDTO dto) {
                var avaliacao = new Avaliacao();

                avaliacao.setId(dto.getId());
                avaliacao.setJustificativa(dto.getJustificativa());
                avaliacao.setNota(dto.getNota());
                avaliacao.setAula(aulaRepository.findById(dto.getAulaId()).orElse(null));
                avaliacao.setAluno(alunoRepository.findById(dto.getAlunoUserId()).orElse(null));

                return avaliacao;
            }
        };
    }
    private Converter<Avaliacao, AvaliacaoDTO> avaliacaoAvaliacaoDTOConverter() {
        return new AbstractConverter<>() {
            @Override
            protected AvaliacaoDTO convert(Avaliacao avaliacao) {
                var dto = new AvaliacaoDTO();

                dto.setId(avaliacao.getId());
                dto.setJustificativa(avaliacao.getJustificativa());
                dto.setAlunoUserId(avaliacao.getAluno().getId());
                dto.setAulaId(avaliacao.getAula().getId());
                dto.setNota(avaliacao.getNota());
                dto.setAula(modelMapper().map(avaliacao.getAula(), AulaDTO.class));

                return dto;
            }
        };
    }

}
