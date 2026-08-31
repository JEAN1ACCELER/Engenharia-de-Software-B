# 🔗 Testes de integração — fluxo de autenticação

## Objetivo

Validar o fluxo completo do diagrama de sequência em um banco SQLite temporário: a tela ou adaptador envia credenciais, o `AuthService` consulta o repositório, o repositório executa uma query parametrizada e o resultado volta como estado seguro para a aplicação.

## Ambiente controlado

A execução deve criar um banco temporário por suíte, aplicar o schema, inserir somente usuários sintéticos e destruir o banco ao final. O relógio, o gerador de identificadores e o serviço de hash devem ser controláveis por fixture. A suíte não deve usar o banco do desenvolvedor nem dados da aplicação real.

## Casos de integração

| ID | Fluxo | Preparação | Verificação ponta a ponta | Criticidade |
|---|---|---|---|---|
| IT-AUTH-001 | Login válido | Inserir usuário sintético e credencial correspondente | Tela/cliente recebe sucesso, `currentUser` é preenchido e DTO não expõe hash | Crítica |
| IT-AUTH-002 | E-mail inexistente | Banco sem o e-mail informado | Repositório retorna vazio, serviço preserva sessão vazia e UI apresenta falha controlada | Alta |
| IT-AUTH-003 | Senha inválida | Inserir usuário com outro derivado | Acesso negado, contador/telemetria aplicável atualizado e nenhum dado sensível retornado | Crítica |
| IT-AUTH-004 | SQL Injection | Usar entrada sintética com caracteres SQL | Query parametrizada não altera schema nem retorna usuário indevido | Crítica |
| IT-AUTH-005 | Falha de banco | Interromper ou simular indisponibilidade do adaptador | UI recebe erro amigável; não há sessão parcial nem crash | Alta |
| IT-AUTH-006 | Logout | Autenticar e então solicitar encerramento | Estado é limpo e rota protegida deixa de ser acessível | Crítica |
| IT-AUTH-007 | Isolamento de dados | Criar dois usuários e projetos independentes | Consulta do primeiro não retorna registros do segundo | Crítica |
| IT-AUTH-008 | Cadastro duplicado | Inserir e-mail, CPF ou CNS já existente | Transação falha de forma controlada e não cria segunda entidade | Alta |
| IT-AUTH-009 | Reabertura | Persistir usuário, reiniciar serviço e autenticar | Dados continuam consistentes após nova conexão | Média |
| IT-AUTH-010 | Retry transitório | Adaptador falha uma vez e funciona na segunda | Retry limitado ocorre apenas para leitura idempotente; sucesso não duplica escrita | Alta |

## Oráculo de integração

A integração é aprovada somente quando o resultado funcional, o estado da sessão, a persistência e o tratamento da exceção são coerentes simultaneamente. Uma tela que exibe “login realizado” sem sessão válida é falha; uma sessão válida que devolve hash à UI também é falha. O caso `IT-AUTH-004` deve confirmar que entradas são tratadas como dados, nunca como parte do comando SQL.

## Critério de aprovação

Todos os casos críticos devem passar em duas execuções consecutivas com banco limpo. A suíte deve ser executável em CI, possuir logs sanitizados e gerar relatório de duração e falhas. Qualquer vazamento de credencial, acesso cruzado entre usuários, operação não idempotente ou registro parcial bloqueia a release.

## Rastreabilidade

| Fluxo do diagrama | Testes | Requisitos |
|---|---|---|
| Entrada e validação | IT-AUTH-001 a IT-AUTH-003 | RF002, RF004 |
| Consulta parametrizada | IT-AUTH-001, IT-AUTH-004, IT-AUTH-010 | RNF002 |
| `alt` de credencial | IT-AUTH-001 a IT-AUTH-003 | RF004, RNF002 |
| Banco indisponível | IT-AUTH-005 | RNF006 |
| Criação e limpeza de sessão | IT-AUTH-001, IT-AUTH-006 | RF005, RF014, RN006 |
| Integridade e isolamento | IT-AUTH-007 a IT-AUTH-009 | RF003, RF008, RN001, RN004 |

## Referências

[1]: https://owasp.org/www-project-web-security-testing-guide/ "OWASP Web Security Testing Guide"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
[3]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Implementação de referência do E-Project"
