# Especificação do Sistema — E-Project

**Versão:** 1.2.0  
**Status:** Baseline documental para validação  
**Produto:** E-Project — gerenciamento pessoal de projetos e tarefas  
**Fonte de implementação:** projeto de referência `projeto_pratico-eg`, consultado em modo somente leitura

## 1. Introdução

O E-Project é um MVP multiplataforma destinado à organização pessoal de projetos e tarefas. A solução concentra autenticação, perfil, dashboard, projetos, tarefas e preferências em uma aplicação Flutter com persistência local em SQLite. A separação entre telas, serviços, modelos e banco de dados permite que o produto seja compreendido, testado e evoluído com menor acoplamento.

Este documento apresenta a especificação funcional e a modelagem UML do produto. Requisitos futuros, como sincronização em nuvem, API remota, notificações push e colaboração entre usuários, são tratados como evolução e não devem ser considerados capacidades entregues pelo MVP atual.

### 1.1. Descrição Geral do Sistema

No cenário atual, a organização de projetos e tarefas pode ocorrer em anotações, planilhas ou ferramentas desconectadas. Essa dispersão dificulta a consulta de prazos, o acompanhamento de status e a retomada do trabalho. No cenário desejado, o usuário utiliza o E-Project como ponto central para criar projetos, associar tarefas, consultar pendências e configurar sua experiência.

| Perspectiva | Situação |
|---|---|
| AS-IS | Informações de projetos e tarefas dispersas, com acompanhamento manual e pouca padronização. |
| TO-BE | Aplicação única com autenticação, persistência local, dashboard e relacionamento entre projetos e tarefas. |
| Benefício esperado | Maior visibilidade do trabalho pessoal, redução de retrabalho e melhor organização dos prazos. |
| Limitação do MVP | Não há sincronização remota, colaboração multiusuário, backup centralizado ou disponibilidade de servidor. |

A arquitetura atual utiliza Flutter na apresentação, Provider para exposição de estado, serviços de aplicação (`AuthService` e `DatabaseService`), modelos de domínio (`User`, `Project` e `Task`) e SQLite na persistência. O fluxo principal parte da tela, passa pelo serviço responsável e termina no banco local, retornando à interface um estado seguro para apresentação.

### 1.2. Descrição dos Usuários

| Usuário | Características | Objetivo principal |
|---|---|---|
| Usuário novo | Ainda não possui conta local | Cadastrar-se, aceitar os termos e iniciar seu primeiro projeto. |
| Usuário autenticado | Possui credenciais e dados persistidos no dispositivo | Consultar projetos, criar tarefas e acompanhar seu trabalho. |
| Usuário recorrente | Retorna ao aplicativo com frequência | Retomar rapidamente tarefas e atualizar o status das entregas. |
| Mantenedor/avaliador | Analisa qualidade e evolução do produto | Verificar requisitos, arquitetura, testes e rastreabilidade. |

#### Histórias de usuário

| ID | História |
|---|---|
| US-01 | Como usuário cadastrado, quero autenticar-me para acessar meus projetos e tarefas. |
| US-02 | Como visitante, quero cadastrar meus dados e aceitar os termos para utilizar o sistema. |
| US-03 | Como usuário autenticado, quero visualizar meu perfil sem expor informações sensíveis. |
| US-04 | Como usuário autenticado, quero criar um projeto para organizar um objetivo ou entrega. |
| US-05 | Como usuário autenticado, quero consultar meus projetos para acompanhar seu status. |
| US-06 | Como usuário autenticado, quero criar uma tarefa vinculada a um projeto. |
| US-07 | Como usuário autenticado, quero visualizar minhas tarefas por status ou prazo. |
| US-08 | Como usuário autenticado, quero configurar preferências e encerrar minha sessão. |

## 2. Requisitos Gerais do Sistema

Os requisitos foram identificados com códigos estáveis, prioridade e complexidade. **Must** representa capacidade indispensável do MVP; **Should**, capacidade importante que pode ser refinada; **Could**, capacidade candidata a uma evolução. A complexidade é relativa e deve ser revisada durante o planejamento técnico.

### 2.1. Requisitos Funcionais

| ID | Descrição | Prioridade | Complexidade | Critério de aceitação |
|---|---|---|---|---|
| RF001 | Permitir cadastro com nome, e-mail, CPF, CNS, papel, senha e confirmação. | Must | Alta | Formulário válido cria o usuário; campos inválidos bloqueiam a operação. |
| RF002 | Validar formato e obrigatoriedade dos dados de cadastro. | Must | Média | Cada campo apresenta feedback específico quando inválido. |
| RF003 | Impedir duplicidade de e-mail, CPF e CNS. | Must | Média | Nenhum registro duplicado é persistido. |
| RF004 | Autenticar usuário por e-mail e senha. | Must | Alta | Credencial válida abre o dashboard; inválida nega acesso. |
| RF005 | Manter o estado do usuário autenticado durante a sessão. | Must | Média | O usuário navega entre telas protegidas sem novo login. |
| RF006 | Exibir dashboard com visão resumida do trabalho. | Must | Média | Dashboard carrega após autenticação e possui estados vazio, carregando e erro. |
| RF007 | Permitir criação de projeto com título, descrição e status. | Must | Média | Projeto válido é salvo e aparece na listagem. |
| RF008 | Listar projetos associados exclusivamente ao usuário autenticado. | Must | Média | Dados de outros usuários não são exibidos. |
| RF009 | Permitir criação de tarefa vinculada a projeto. | Must | Média | Tarefa válida é salva com projeto obrigatório. |
| RF010 | Listar tarefas com informações de título, status e prazo. | Must | Média | Lista apresenta dados persistidos e trata lista vazia. |
| RF011 | Exibir perfil do usuário autenticado. | Should | Baixa | Perfil apresenta dados cadastrais sem mostrar o hash da senha. |
| RF012 | Permitir configuração de preferências suportadas pelo MVP. | Should | Média | Alterações são refletidas conforme o armazenamento implementado. |
| RF013 | Exigir aceite dos termos e da política de privacidade no cadastro. | Must | Sem os aceites, o cadastro não é concluído. |
| RF014 | Permitir logout e retorno à autenticação. | Must | Sessão é limpa e telas protegidas deixam de ser acessíveis pela navegação normal. |
| RF015 | Apresentar mensagens de carregamento, sucesso e erro. | Should | Falhas não silenciam e não encerram a aplicação inesperadamente. |
| RF016 | Permitir exportação interoperável dos dados. | Could | Só será aceito após definição do formato e teste de abertura. |

### 2.2. Requisitos Não-Funcionais

| ID | Atributo de qualidade | Requisito | Verificação |
|---|---|---|---|
| RNF001 | Desempenho | Consultas locais não devem bloquear perceptivelmente a interface no volume esperado do MVP. | Teste com massa representativa. |
| RNF002 | Segurança | Queries devem ser parametrizadas e o hash da senha nunca deve ser exibido na interface ou logs. | Revisão de código e testes negativos. |
| RNF003 | Segurança evolutiva | Em backend remoto, utilizar TLS, algoritmo apropriado para senhas, expiração de sessão e controle de tentativas. | Gate de arquitetura antes da sincronização. |
| RNF004 | Usabilidade | Fluxos principais devem ser compreensíveis sem treinamento formal. | Avaliação heurística e teste de usuário. |
| RNF005 | Acessibilidade | Controles devem ter rótulos, foco, contraste e navegação compatíveis com WCAG 2.1 AA quando aplicável. | Checklist e inspeção manual. |
| RNF006 | Confiabilidade | Falha de persistência deve produzir erro controlado e preservar consistência. | Testes de exceção e reabertura. |
| RNF007 | Manutenibilidade | UI, serviços, modelos e persistência devem permanecer separados e testáveis. | Revisão estrutural e análise estática. |
| RNF008 | Portabilidade | O comportamento deve ser consistente nas plataformas Flutter definidas para a entrega. | Matriz de execução. |
| RNF009 | Privacidade | Coletar apenas dados necessários e registrar os aceites informados. | Revisão de fluxo e documentação. |
| RNF010 | Observabilidade | Erros devem conter contexto diagnóstico sem registrar credenciais ou dados pessoais desnecessários. | Inspeção de logs sanitizados. |

### 2.3. Regras de Negócio

| ID | Regra | Prioridade |
|---|---|---|
| RN001 | E-mail, CPF e CNS devem ser únicos no conjunto de usuários local. | Alta |
| RN002 | O cadastro exige aceite explícito dos termos e da política de privacidade. | Alta |
| RN003 | A senha deve atender ao mínimo definido no formulário e possuir confirmação compatível. | Alta |
| RN004 | Projetos e tarefas pertencem ao usuário autenticado; consultas devem respeitar esse vínculo. | Alta |
| RN005 | Toda tarefa deve estar vinculada a um projeto válido. | Alta |
| RN006 | O logout deve limpar o estado de sessão. | Alta |
| RN007 | Preferências pertencem ao usuário que as alterou. | Média |
| RN008 | Dados inválidos ou incompletos não podem ser persistidos como registros válidos. | Alta |

## 3. Diagramas UML

Os diagramas estão na pasta [`../diagrams`](../diagrams). Eles representam a visão do MVP e também indicam extensões futuras sem afirmar que tais extensões já estejam implementadas.

### 3.1. Diagramas de Casos de Uso

O diagrama [`casos-de-uso.mmd`](../diagrams/casos-de-uso.mmd) representa visitante, usuário cadastrado e usuário autenticado. O cadastro inclui validação de campos e registro de aceites. A autenticação inclui consulta do usuário. Logout é modelado como extensão do contexto de sessão autenticada, pois depende de uma sessão existente.

| Caso de uso | Ator principal | Objetivo |
|---|---|---|
| UC01 — Cadastrar usuário | Visitante | Criar conta local com dados válidos e aceites registrados. |
| UC02 — Autenticar usuário | Usuário cadastrado | Validar credenciais e iniciar sessão. |
| UC03 — Consultar dashboard | Usuário autenticado | Visualizar resumo de projetos e tarefas. |
| UC04 — Gerenciar projetos | Usuário autenticado | Criar e consultar seus projetos. |
| UC05 — Gerenciar tarefas | Usuário autenticado | Criar e consultar tarefas vinculadas a projetos. |
| UC06 — Consultar perfil | Usuário autenticado | Visualizar seus dados cadastrais. |
| UC07 — Configurar preferências | Usuário autenticado | Alterar configurações disponíveis. |
| UC08 — Encerrar sessão | Usuário autenticado | Limpar sessão e voltar ao login. |

### 3.2. Especificação dos Casos de Uso

#### UC01 — Cadastrar usuário

| Campo | Especificação |
|---|---|
| Ator | Visitante |
| Pré-condições | Aplicação inicializada e tela de cadastro disponível. |
| Fluxo principal | Informar dados; validar campos; verificar unicidade; validar aceites; derivar senha; persistir usuário; exibir sucesso. |
| Fluxo alternativo A1 | Campo inválido: informar erro junto ao campo e não persistir. |
| Fluxo alternativo A2 | E-mail, CPF ou CNS duplicado: informar conflito e manter formulário preenchido. |
| Fluxo alternativo A3 | Banco indisponível: exibir erro amigável e não criar registro parcial. |
| Pós-condição | Usuário persistido e apto a autenticar-se. |
| Pontos de extensão | Integração futura com provedor de identidade e confirmação por e-mail. |

#### UC02 — Autenticar usuário

| Campo | Especificação |
|---|---|
| Ator | Usuário cadastrado |
| Pré-condições | Usuário existe e tela de login está disponível. |
| Fluxo principal | Informar e-mail e senha; validar campos; consultar usuário; comparar derivado; criar sessão; navegar ao dashboard. |
| Fluxo alternativo A1 | E-mail inexistente: informar falha de autenticação sem expor detalhes desnecessários. |
| Fluxo alternativo A2 | Senha inválida: negar acesso, manter sessão vazia e permitir nova tentativa. |
| Fluxo alternativo A3 | Timeout ou falha do banco: informar indisponibilidade e não alterar a sessão. |
| Pós-condição | Sessão autenticada ou estado de sessão inalterado. |
| Pontos de extensão | Recuperação de senha, bloqueio progressivo e autenticação remota em release futura. |

#### UC03 — Gerenciar projetos

| Campo | Especificação |
|---|---|
| Ator | Usuário autenticado |
| Pré-condições | Sessão válida e tela de projetos disponível. |
| Fluxo principal | Abrir formulário; informar título e dados; validar; persistir projeto; atualizar lista. |
| Fluxo alternativo | Título vazio ou erro de banco: rejeitar operação e informar o usuário. |
| Pós-condição | Projeto associado ao usuário autenticado. |
| Pontos de extensão | Edição, remoção, compartilhamento e sincronização remota. |

#### UC04 — Gerenciar tarefas

| Campo | Especificação |
|---|---|
| Ator | Usuário autenticado |
| Pré-condições | Sessão válida e projeto selecionado. |
| Fluxo principal | Selecionar projeto; informar tarefa; validar; persistir; atualizar lista. |
| Fluxo alternativo | Projeto inexistente, título inválido ou prazo inconsistente: rejeitar e informar. |
| Pós-condição | Tarefa vinculada a projeto válido. |
| Pontos de extensão | Filtros avançados, recorrência, notificações e colaboração. |

#### UC05 — Encerrar sessão

| Campo | Especificação |
|---|---|
| Ator | Usuário autenticado |
| Pré-condições | Sessão ativa. |
| Fluxo principal | Solicitar logout; limpar estado no `AuthService`; redirecionar ao login. |
| Fluxo alternativo | Estado já limpo: redirecionar ao login sem falha. |
| Pós-condição | Nenhuma tela protegida acessível pela sessão anterior. |
| Pontos de extensão | Revogação de token em backend remoto. |

### 3.3. Diagrama de Sequência

O diagrama [`sequencia-login.mmd`](../diagrams/sequencia-login.mmd) detalha o login. O fluxo usa `AuthService`, um repositório de usuários e SQLite. O fragmento `alt` trata usuário inexistente, senha válida, senha inválida e banco indisponível. A UI recebe um resultado seguro, equivalente a um `UserResponseDTO`, sem o hash da senha.

A consulta ao banco deve ser parametrizada. Retries, quando adotados para falhas transitórias, devem ser limitados e não podem repetir operações de escrita de forma insegura. Em uma implementação remota, a sessão deve possuir expiração e o provedor de identidade deve ser responsável por credenciais.

### 3.4. Diagrama de Atividades

O diagrama [`atividades-autenticacao.mmd`](../diagrams/atividades-autenticacao.mmd) apresenta raias para Usuário, Front-end, Back-end/Serviço e Banco de Dados. A separação explicita a responsabilidade de cada participante e facilita a futura definição de endpoints ou adaptadores.

O fluxo inicia com a entrada de credenciais, passa pela validação de formato, consulta ao banco e decisão de credencial válida. Em caso de erro, o sistema retorna mensagem controlada; em caso de sucesso, cria sessão e apresenta o dashboard.

### 3.5. Diagrama de Classes

O diagrama [`classes-dominio.mmd`](../diagrams/classes-dominio.mmd) apresenta as entidades e serviços centrais. `User` possui projetos; `Project` possui tarefas; `Task` pertence a um projeto. `AuthService` controla a sessão e `DatabaseService` encapsula a persistência.

| Classe | Responsabilidade | Multiplicidade relevante |
|---|---|---|
| `User` | Representar identidade e dados cadastrais. | Um usuário possui zero ou muitos projetos. |
| `Project` | Representar um agrupamento de trabalho. | Um projeto pertence a um usuário e possui zero ou muitas tarefas. |
| `Task` | Representar uma atividade executável. | Uma tarefa pertence a exatamente um projeto. |
| `AuthService` | Autenticar e controlar sessão. | Usa o serviço de persistência. |
| `DatabaseService` | Inicializar SQLite e executar operações parametrizadas. | Persiste usuários, projetos e tarefas. |
| `UserResponseDTO` | Transportar dados seguros à interface. | Não contém `passwordHash`. |

O padrão **Repository** pode ser extraído do `DatabaseService` para isolar persistência. O padrão **Mapper** deve transformar registros em DTOs quando os modelos de armazenamento divergirem dos modelos de apresentação. O padrão **Observer** é representado pelo Provider/ChangeNotifier, que notifica telas quando o estado muda.

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Projeto de referência do E-Project"
[2]: https://www.w3.org/TR/WCAG21/ "Web Content Accessibility Guidelines 2.1"
[3]: https://www.iso.org/standard/78176.html "ISO/IEC 25010"
[4]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
[5]: https://spec.openapis.org/oas/latest.html "OpenAPI Specification"
