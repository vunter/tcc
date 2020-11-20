/* INSERT USUARIOS */
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leoeifert@hotmail.com', 'Leonardo Eifert Catanante', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'admin');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leoeifert@gmail.com', 'Leonardo Eifert Catanante', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'aluno');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leonardo.eifert@gmail.com', 'Leonardo Eifert Catanante', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'professor');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('marcio@gmail.com', 'MÁRCIO ANDRÉ AZEVEDO MATOS', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'marcio.azevedo');

/* INSERT ALUNOS */
INSERT INTO ALUNO (MATRICULA, USER_ID)
VALUES('A000001112020', 2);
INSERT INTO ALUNO (MATRICULA, USER_ID)
VALUES('A000002112020', 4);

/* INSERT PROFESSORES */
INSERT INTO PROFESSOR (CPF, USER_ID)
VALUES ('06742100184', 3);

/* INSERT ROLES */
INSERT INTO TD_ROLE(ID, DESCRICAO, NOME) VALUES (1, 'Usuário Comum', 'USER');
INSERT INTO TD_ROLE(ID, DESCRICAO, NOME) VALUES (2, 'Administrador', 'ADMIN');
INSERT INTO TD_ROLE(ID, DESCRICAO, NOME) VALUES (3, 'Professor', 'PROFESSOR');
INSERT INTO TD_ROLE(ID, DESCRICAO, NOME) VALUES (4, 'Aluno', 'ALUNO');

/* INSERT ROLES_USERS */
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (1, 1);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (2, 1);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (3, 1);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (4, 1);

INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (1, 2);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (2, 4);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (3, 3);
INSERT INTO ROLES_USERS(USER_ID, ROLE_ID) VALUES (4, 4);
/* INSERT TURMA */
INSERT INTO TURMA(CAPACIDADE, CODIGO, DESCRICAO, PUBLICO, PROFESSOR_USER_ID)
VALUES (30, 'AB1234', 'Turma de teste', 'Y', 3);

/* INSERT TURMA_ALUNOS */
INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (1, 2);
INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (1, 4);

/* INSERT PUBLICACAO */
INSERT INTO PUBLICACAO(CONTEUDO, AUTOR_USER_ID, TURMA_ID) VALUES ('TESTE', 2, 1);
INSERT INTO PUBLICACAO(CONTEUDO, AUTOR_USER_ID, TURMA_ID) VALUES ('TESTE REPLY', 3, 1);

/* INSERT PUBLICACAO_REPLIES */
INSERT INTO PUBLICACAO_REPLIES(PUBLICACAO_ID, REPLIES_ID) VALUES (1, 2);

/* INSERT  AULA */
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID)
VALUES (SYSDATE, '15:00:00', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste', 1);

/* INSERT  AVALIACAO */
INSERT INTO AVALIACAO(NOTA, ALUNO_USER_ID, AULA_ID) VALUES (999.999, 2, 1);

/* INSERT BLOCO */
INSERT INTO BLOCO(CONTEUDO, TITULO, PROFESSOR_ID) VALUES ('let teste = true; \n if(teste) { console.log("teste funciona"}', 'Bloco de Teste', 3);

/* INSERT AULA_BLOCOS */
INSERT INTO AULA_BLOCOS(AULA_ID, BLOCOS_ID) VALUES (1, 1);