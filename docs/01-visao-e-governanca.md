# 1. Visão e governança

## 1.1 Propósito do documento

Este documento define o contexto de negócio, os públicos envolvidos, o vocabulário comum, o escopo e o mecanismo de governança do E-Project. A seção deve ser lida como um guia de navegação: a documentação de requisitos orienta produto e cliente; a arquitetura orienta desenvolvimento; os testes orientam QA; e a matriz de riscos deve ser revisitada ao final de cada sprint.

## 1.2 Contexto AS-IS e TO-BE

No cenário **AS-IS**, o usuário precisa organizar projetos e tarefas sem uma visão centralizada de suas atividades. Informações de projeto, prazo, status e preferências podem ficar dispersas em anotações ou ferramentas diferentes, o que reduz a visibilidade e aumenta o esforço de acompanhamento.

No cenário **TO-BE**, o E-Project centraliza cadastro, autenticação, projetos, tarefas, perfil e preferências em uma aplicação Flutter. O usuário consulta o dashboard, cria projetos, registra tarefas e acompanha o estado do trabalho em uma interface única, com persistência local em SQLite. O MVP reduz a fragmentação da informação; não promete colaboração remota nem sincronização entre dispositivos.

## 1.3 Audiência e responsabilidades

A audiência inclui cliente e Product Owner, desenvolvedores, arquiteto, QA, responsável por dados, avaliadores acadêmicos e usuários finais. Cada grupo deve consultar a parte da documentação que sustenta sua decisão, evitando que uma especificação técnica seja usada como contrato de negócio sem validação do PO.

### Matriz RACI

| Atividade | Cliente/PO | Arquiteto | Desenvolvimento | QA | Usuário |
|---|---|---|---|---|---|
| Priorizar requisitos | A/R | C | C | C | C |
| Aprovar escopo | A | C | I | C | I |
| Definir arquitetura | C | A/R | R | C | I |
| Implementar telas e serviços | I | C | A/R | I | I |
| Definir e executar testes | C | C | R | A/R | C |
| Validar usabilidade | A | C | R | R | C |
| Aceitar a release | A/R | C | I | C | I |
| Avaliar riscos | A | R | R | R | I |

**Legenda:** R = responsável por executar; A = responsável final pela decisão; C = consultado; I = informado.

## 1.4 Personas e histórias

| Persona | Necessidade | História de usuário |
|---|---|---|
| Estudante ou profissional individual | Organizar trabalho pessoal | Como usuário, quero criar projetos e tarefas para acompanhar minhas entregas em um só lugar. |
| Usuário autenticado | Retomar o trabalho com segurança | Como usuário cadastrado, quero entrar com meu e-mail e senha para acessar meus dados locais. |
| Usuário com múltiplos projetos | Priorizar o que está em andamento | Como usuário, quero consultar meus projetos e suas tarefas para decidir o próximo passo. |
| Usuário preocupado com experiência | Ajustar a aplicação ao seu uso | Como usuário, quero configurar preferências e visualizar meu perfil para personalizar a experiência. |

## 1.5 Glossário técnico

| Termo | Definição operacional |
|---|---|
| API | Interface formal para comunicação entre componentes de software. |
| CRUD | Operações de criar, consultar, atualizar e remover dados. |
| DTO | Objeto usado para transportar dados entre camadas sem expor a entidade de persistência. |
| MVP | Produto mínimo viável, com o menor conjunto de capacidades que entrega valor verificável. |
| MVC | Separação entre modelo, visão e controle; o MVP combina essa ideia com serviços e Provider. |
| ORM | Mapeamento objeto-relacional; não é a estratégia principal do MVP, que usa SQLite diretamente. |
| Provider | Mecanismo Flutter utilizado para disponibilizar serviços e estado às telas. |
| SQLite | Banco de dados relacional embutido e local. |
| SHA-256 | Função de resumo criptográfico usada no material de referência para comparação de senhas. |
| SQL Injection | Exploração que insere comandos SQL não autorizados; consultas parametrizadas reduzem esse risco. |
| RACI | Matriz de responsabilidades: Responsible, Accountable, Consulted e Informed. |
| RTM | Requirements Traceability Matrix, ou matriz de rastreabilidade de requisitos. |
| NFR/RNF | Non-Functional Requirement, requisito não funcional. |
| RFC | Request for Comments, proposta formal de mudança submetida à revisão. |
| CI/CD | Integração e entrega contínuas; recomendadas para evolução, mas não presumidas no MVP local. |
| SLA | Acordo de nível de serviço; não se aplica ao armazenamento local sem operação de servidor. |
| UX/UI | Experiência do usuário e interface do usuário. |
| TLS | Protocolo de proteção de comunicação em trânsito; deve ser adotado se o produto ganhar backend remoto. |
| JWT | Token assinado para autenticação; não faz parte da autenticação local atual. |

## 1.6 Escopo

### Incluído no MVP

Cadastro, login, aceite de termos, perfil, dashboard, projetos, tarefas, preferências, persistência local, validações de entrada, navegação entre telas, serviços de autenticação e banco, além de testes unitários básicos.

### Fora do escopo atual

Colaboração entre usuários, autorização por papéis em servidor, notificações push, sincronização em nuvem, recuperação de senha por e-mail, auditoria centralizada, integração com calendários, analytics de produção e alta disponibilidade. Esses itens só entram após RFC, análise de segurança e revisão do modelo de dados.

## 1.7 Histórico e controle de alterações

| ID | Data | Alteração | Impacto | Aprovado por |
|---|---|---|---|---|
| CHG-001 | 2026-08-25 | Criação da baseline documental profissional | Alto: reorganiza entendimento, validação e governança | Pendente: PO e arquiteto |

O responsável por uma alteração deve registrar motivação, documentos afetados, requisitos impactados, risco, estratégia de teste e plano de reversão. Para maior integridade, a equipe pode publicar o checksum do pacote documental em cada release; esse checksum não substitui revisão nem assinatura da autoridade competente.

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Repositório de referência do E-Project"
[2]: https://www.w3.org/TR/WCAG21/ "Web Content Accessibility Guidelines 2.1"
[3]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
