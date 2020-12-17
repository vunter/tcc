/* INSERT USUARIOS */
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leoeifert@hotmail.com', 'Leonardo Eifert Catanante', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'admin');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leoeifert@gmail.com', 'Davi Alves de Jesus', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'aluno');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('leonardo.eifert@gmail.com', 'Leonardo Eifert Catanante', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'professor');
INSERT INTO USUARIO (EMAIL, NOME, PASSWORD, "USER")
VALUES('marcio@gmail.com', 'Márcio André Azevedo Matos', '$2a$10$s5Zdv17v/8Qc/NnNmYj9gusl6rKmb81W1ZS03w43IVQrlgMrIxwZq', 'marcio.azevedo');

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
INSERT INTO TURMA(CAPACIDADE, CODIGO, TITULO, DESCRICAO, PUBLICO, PROFESSOR_USER_ID)
VALUES (30, 'AB1234', 'Lógica de Programação Básica','Esta turma tem como propósito ensinar o básico de lógica de programação', 'Y', 3);
INSERT INTO TURMA(CAPACIDADE, CODIGO, TITULO, DESCRICAO, PUBLICO, PROFESSOR_USER_ID)
VALUES (2, 'AB2341', 'Lógica de Programação Intermediária','Turma de teste 2', 'Y', 3);
INSERT INTO TURMA(CAPACIDADE, CODIGO, TITULO, DESCRICAO, PUBLICO, PROFESSOR_USER_ID)
VALUES (30, 'AB3412', 'Lógica de Programação Avançada','Turma de teste 3', 'Y', 3);
INSERT INTO TURMA(CAPACIDADE, CODIGO, TITULO, DESCRICAO, PUBLICO, PROFESSOR_USER_ID)
VALUES (30, 'AB4321', 'Lógica de Programação Expert','Turma de teste 4', 'Y', 3);

/* INSERT TURMA_ALUNOS */
INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (1, 2);
INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (2, 2);
-- INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (3, 2);
-- INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (4, 2);

INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (1, 4);
-- INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (2, 4);
-- INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (3, 4);
-- INSERT INTO TURMA_ALUNOS(TURMA_ID, ALUNOS_ID) VALUES (4, 4);


/* INSERT PUBLICACAO */
INSERT INTO PUBLICACAO(CONTEUDO, AUTOR_USER_ID, TURMA_ID, DATA) VALUES ('Olá a todos!', 2, 1, SYSDATE);
INSERT INTO PUBLICACAO(CONTEUDO, AUTOR_USER_ID, TURMA_ID, DATA) VALUES ('Olá, seja bem vindo!', 3, 1, SYSDATE);
INSERT INTO PUBLICACAO(CONTEUDO, AUTOR_USER_ID, TURMA_ID, DATA) VALUES ('Tenho uma dúvida!', 4, 1, '2020-12-15 15:30:00');


/* INSERT PUBLICACAO_REPLIES */
INSERT INTO PUBLICACAO_REPLIES(PUBLICACAO_ID, REPLIES_ID) VALUES (1, 2);

/* INSERT  AULA */
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID, INICIADA, FINALIZADA)
VALUES (SYSDATE, '900', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste 1', 1, false, false);
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID, INICIADA, FINALIZADA)
VALUES (SYSDATE, '900', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste 2', 1, false, false);
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID, INICIADA, FINALIZADA)
VALUES (SYSDATE, '900', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste 3', 1, false, false);
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID, INICIADA, FINALIZADA)
VALUES (SYSDATE, '900', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste 4', 1, false, false);
INSERT INTO AULA(DATA_AULA, DURACAO, GABARITO, OBJETIVO, TITULO, TURMA_ID, INICIADA, FINALIZADA)
VALUES ('2020-12-15 15:30:00', '900', 'TESTE DE GABARITO \n TESTE 2', 'Teste', 'Aula de teste 6', 1, false, false);


/*INSERT RESPOSTA */
INSERT INTO RESPOSTA(RESPOSTA, PRINT, ALUNO_USER_ID, AULA_ID) VALUES ('<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable >aa</variable>
  </variables>
  <block type="procedures_defnoreturn" >
    <field name="NAME">teste</field>
    <comment pinned="false" h="80" w="160">Descreva esta função...</comment>
    <statement name="STACK">
      <block type="variables_set" >
        <field name="VAR" >aa</field>
        <value name="VALUE">
          <block type="math_number" >
            <field name="NUM">12</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>', null, 4, 1);

/* INSERT  AVALIACAO */
INSERT INTO AVALIACAO(NOTA, ALUNO_USER_ID, AULA_ID) VALUES (999.999, 2, 1);

/* INSERT BLOCO */
INSERT INTO BLOCO(CONTEUDO, TITULO, PROFESSOR_ID) VALUES ('<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable >aa</variable>
  </variables>
  <block type="procedures_defnoreturn" >
    <field name="NAME">teste</field>
    <comment pinned="false" h="80" w="160">Descreva esta função...</comment>
    <statement name="STACK">
      <block type="variables_set" >
        <field name="VAR" >aa</field>
        <value name="VALUE">
          <block type="math_number" >
            <field name="NUM">12</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>', 'Bloco de Teste', 3);
INSERT INTO BLOCO(CONTEUDO, TITULO, PROFESSOR_ID) VALUES ('<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable>teste</variable>
  </variables>
  <block type="text_append" x="342" y="369">
    <field name="VAR">teste</field>
    <value name="TEXT">
      <block type="variables_get">
        <field name="VAR">teste</field>
      </block>
    </value>
    <next>
      <block type="controls_if"></block>
    </next>
  </block>
</xml>', 'Bloco de Teste 2', 3);

/* INSERT AULA_BLOCOS */
INSERT INTO AULA_BLOCOS(AULA_ID, BLOCOS_ID) VALUES (1, 1);
INSERT INTO AULA_BLOCOS(AULA_ID, BLOCOS_ID) VALUES (1, 2);