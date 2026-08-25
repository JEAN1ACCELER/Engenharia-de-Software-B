# Engenharia de Software B — E-Project

## Visão executiva

Este repositório consolida a especificação, a arquitetura, a qualidade e a governança do **E-Project**, um MVP de gerenciamento pessoal de projetos e tarefas. O sistema foi documentado a partir do material acadêmico e técnico do projeto de referência `projeto_pratico-eg`, sem modificar o repositório de origem. O resultado organiza o conteúdo em uma baseline profissional, com rastreabilidade entre necessidades, requisitos, histórias, componentes, testes e riscos.

> **Objetivo do produto:** oferecer uma aplicação multiplataforma para que usuários criem projetos, organizem tarefas, acompanhem seu perfil e configurem preferências, com autenticação, persistência local e uma interface simples e consistente.

O escopo atual é deliberadamente compatível com um **MVP local**: a aplicação Flutter utiliza SQLite para persistência no dispositivo, Provider para gerenciamento de estado e serviços separados para autenticação e acesso a dados. Evoluções para sincronização em nuvem, API remota e colaboração multiusuário ficam registradas como roadmap, não como capacidades já implementadas.

## Estado da baseline

| Dimensão | Estado documentado | Evidência principal |
|---|---:|---|
| Produto e requisitos | Consolidado | `docs/02-requisitos.md` |
| Arquitetura | Consolidado para MVP | `docs/03-arquitetura-e-uml.md` |
| Histórias de usuário | 8 histórias rastreadas | `docs/05-rastreabilidade-e-riscos.md` |
| Testes | Casos, classes de equivalência e estratégia definidos | `docs/04-testes-e-qualidade.md` |
| Segurança | Controles mínimos do MVP especificados; melhorias registradas | `docs/06-operacao-e-governanca.md` |
| Governança documental | Baseline inicial | `docs/01-visao-e-governanca.md` |
| Implementação | MVP funcional conforme a documentação de referência | Código e testes permanecem no repositório de referência |

Os itens acima distinguem **o que foi implementado no material de referência** do que está sendo formalizado como controle profissional. Não se deve interpretar uma especificação futura como funcionalidade já entregue.

## Estrutura documental

| Documento | Finalidade | Público prioritário |
|---|---|---|
| [`docs/01-visao-e-governanca.md`](docs/01-visao-e-governanca.md) | Contexto, stakeholders, RACI, glossário, escopo e controle de alterações | Cliente, PO, equipe e avaliadores |
| [`docs/02-requisitos.md`](docs/02-requisitos.md) | Requisitos funcionais, não funcionais, regras de negócio e critérios de aceitação | PO, cliente, QA e desenvolvimento |
| [`docs/03-arquitetura-e-uml.md`](docs/03-arquitetura-e-uml.md) | Arquitetura em camadas, modelo de dados, fluxos e diagramas | Arquitetura, desenvolvimento e infraestrutura |
| [`docs/04-testes-e-qualidade.md`](docs/04-testes-e-qualidade.md) | Estratégia de testes, casos, cobertura e critérios de qualidade | QA e desenvolvimento |
| [`docs/05-rastreabilidade-e-riscos.md`](docs/05-rastreabilidade-e-riscos.md) | Matriz RTM, riscos, mitigação e lições aprendidas | Gerência, PO, QA e arquitetura |
| [`docs/06-operacao-e-governanca.md`](docs/06-operacao-e-governanca.md) | Segurança, acessibilidade, versionamento, releases e operação | Dev, QA, DevOps e mantenedores |
| [`diagrams/arquitetura.mmd`](diagrams/arquitetura.mmd) | Visão visual da arquitetura do MVP | Equipe técnica |
| [`diagrams/rastreabilidade.mmd`](diagrams/rastreabilidade.mmd) | Relação entre atores, casos de uso e módulos | Equipe técnica e QA |

## Escopo do MVP

O MVP contempla cadastro e autenticação, aceite de termos, perfil, criação e consulta de projetos, criação e consulta de tarefas, preferências e navegação entre as telas principais. As entidades centrais são `User`, `Project` e `Task`; os serviços centrais são `AuthService` e `DatabaseService`.

A aplicação não deve ser apresentada como uma plataforma corporativa multiusuário. O armazenamento é local, o hash de senha documentado no projeto de referência é SHA-256 e não há, no MVP, servidor de identidade, TLS entre cliente e servidor, sincronização remota, recuperação de senha por e-mail ou colaboração em tempo real. Essas limitações são importantes para uma avaliação honesta de risco.

## Como navegar e validar

Para compreender o produto, leia primeiro a visão e a governança; em seguida, percorra requisitos, arquitetura, testes e rastreabilidade. Para executar a implementação, consulte o `TP4-MVP/README.md` e a documentação técnica no repositório `projeto_pratico-eg`. Este repositório é a camada de engenharia e documentação; o código-fonte de referência não é duplicado nem alterado aqui.

A validação mínima deve confirmar a existência dos requisitos e histórias, a ligação de cada história a componentes e testes, a coerência do modelo de dados, a cobertura dos fluxos alternativos e a distinção entre funcionalidades implementadas e itens de evolução.

## Controle de alterações

| Versão | Data | Descrição | Autor | Aprovado por |
|---|---|---|---|---|
| 1.0.0 | 2026-08-25 | Criação da baseline profissional a partir do material de referência e do roteiro de melhoria | Manus AI | Pendente de revisão do responsável pelo projeto |

Alterações que afetem requisitos, arquitetura, segurança ou critérios de aceitação devem ser abertas como RFC e aprovadas pelo responsável pelo produto e pelo responsável técnico antes de serem incorporadas à baseline.

## Licença

Este repositório mantém a licença MIT existente. A licença não substitui obrigações acadêmicas, atribuição de autoria, proteção de dados ou revisão das decisões técnicas antes de uso em produção.

## Referências internas

1. [Repositório de referência `projeto_pratico-eg`](https://github.com/JEAN1ACCELER/projeto_pratico-eg).
2. [Repositório documental `Engenharia-de-Software-B`](https://github.com/JEAN1ACCELER/Engenharia-de-Software-B).
3. [WCAG 2.1 — W3C](https://www.w3.org/TR/WCAG21/).
4. [ISO/IEC 25010 — modelo de qualidade de produto](https://www.iso.org/standard/78176.html).
5. [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/).

> As referências externas são pontos de consulta para evolução. As decisões específicas do MVP devem ser lidas junto da documentação interna, que registra as limitações reais do projeto de referência.

**Responsável pela baseline:** Manus AI  
**Projeto:** Engenharia de Software B  
**Versão:** 1.0.0  
**Data:** 25 de agosto de 2026

> Nota de integridade: este documento foi produzido no repositório destino. O repositório `projeto_pratico-eg` foi utilizado somente para leitura e permaneceu sem modificações.