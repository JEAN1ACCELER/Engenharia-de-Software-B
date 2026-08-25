# 2. Requisitos do sistema

## 2.1 Convenções

Os requisitos usam identificadores estáveis e linguagem testável. A prioridade segue **Must**, **Should** e **Could**; a complexidade representa a estimativa relativa para o MVP. A implementação deve preservar a distinção entre requisito, regra de negócio e decisão técnica.

## 2.2 Requisitos funcionais

| ID | Requisito | Prioridade | Complexidade | Critério de aceitação |
|---|---|---|---|---|
| RF-001 | O sistema deve permitir cadastro com nome, e-mail, CPF, CNS, papel, senha e confirmação, validando campos obrigatórios. | Must | Alta | Cadastro válido cria usuário; dados inválidos são rejeitados com mensagem orientativa. |
| RF-002 | O sistema deve impedir cadastro de e-mail, CPF ou CNS já existente. | Must | Média | A tentativa duplicada não cria novo registro e informa o conflito. |
| RF-003 | O sistema deve autenticar usuário por e-mail e senha. | Must | Alta | Credenciais válidas abrem o dashboard; inválidas permanecem no login. |
| RF-004 | O sistema deve persistir o estado de autenticação durante a sessão local. | Must | Média | O usuário autenticado pode navegar sem repetir login a cada tela. |
| RF-005 | O sistema deve exibir o perfil do usuário autenticado. | Must | Baixa | Nome, e-mail e dados cadastrais são exibidos sem expor o hash da senha. |
| RF-006 | O sistema deve permitir criar projeto com título, descrição e status. | Must | Média | Projeto válido é persistido e aparece na listagem do usuário. |
| RF-007 | O sistema deve listar projetos associados ao usuário autenticado. | Must | Média | A lista exibe somente os projetos pertencentes ao usuário. |
| RF-008 | O sistema deve permitir criar tarefa vinculada a projeto, com título, descrição, status e prazo opcional. | Must | Média | Tarefa válida é persistida no projeto selecionado. |
| RF-009 | O sistema deve listar tarefas e ordená-las de forma útil para acompanhamento. | Should | Média | Tarefas são agrupadas ou ordenadas por projeto, status ou vencimento. |
| RF-010 | O sistema deve permitir atualizar preferências de notificações, tema e idioma quando disponíveis na interface. | Should | Preferência alterada é mantida conforme o suporte efetivamente implementado. |
| RF-011 | O sistema deve exigir aceite explícito dos termos e da política de privacidade no cadastro. | Must | Sem os aceites, o cadastro é interrompido. |
| RF-012 | O sistema deve permitir logout e retornar à tela de autenticação. | Must | Após o logout, telas protegidas não ficam acessíveis pela navegação normal. |
| RF-013 | O sistema deve apresentar estado de carregamento, sucesso e erro nas operações de autenticação e persistência. | Should | O usuário recebe feedback sem a aplicação travar ou falhar silenciosamente. |
| RF-014 | O sistema deve permitir consulta de detalhes de projeto e suas tarefas. | Should | A seleção de um projeto apresenta seu contexto e itens associados. |
| RF-015 | O sistema poderá exportar projetos e tarefas em formato interoperável. | Could | A funcionalidade só será considerada aceita quando houver formato definido e teste de importação/abertura. |

## 2.3 Requisitos não funcionais

| ID | Atributo | Requisito verificável | Estratégia de verificação |
|---|---|---|---|
| RNF-001 | Usabilidade | Fluxos de cadastro, login, projeto e tarefa devem ser compreensíveis sem treinamento formal. | Avaliação heurística e teste com usuário. |
| RNF-002 | Acessibilidade | Controles devem possuir rótulos claros, foco visível, contraste adequado e navegação por teclado quando a plataforma oferecer o recurso. | Checklist WCAG 2.1 AA e inspeção manual. |
| RNF-003 | Desempenho | Consultas locais das listas principais devem responder sem bloqueio perceptível da interface em volume de MVP. | Teste com massa representativa e inspeção de frames. |
| RNF-004 | Segurança | Entradas devem ser validadas e queries SQLite parametrizadas; o hash nunca deve ser exibido na UI. | Revisão de código e testes negativos. |
| RNF-005 | Segurança evolutiva | Para backend remoto, substituir SHA-256 simples por algoritmo de senha apropriado, adotar TLS e sessão/token com expiração. | Gate de arquitetura antes da sincronização. |
| RNF-006 | Confiabilidade | Falhas de persistência devem gerar mensagem controlada e manter o estado consistente. | Testes de erro e reabertura da aplicação. |
| RNF-007 | Manutenibilidade | UI, serviços, modelos e testes devem permanecer separados; validações comuns devem ser reutilizáveis. | Revisão estrutural e análise estática. |
| RNF-008 | Portabilidade | A aplicação deve manter comportamento consistente nas plataformas Flutter oficialmente suportadas pelo MVP. | Matriz de execução por plataforma alvo. |
| RNF-009 | Privacidade | Coletar apenas dados necessários ao escopo; informar finalidade e aceite antes do cadastro. | Revisão de fluxo e documentação de privacidade. |
| RNF-010 | Observabilidade | Erros relevantes devem possuir contexto suficiente para diagnóstico local, sem registrar credenciais ou dados sensíveis. | Inspeção de logs e testes de exceção. |

## 2.4 Regras de negócio

| ID | Regra | Prioridade |
|---|---|---|
| RN-001 | Um e-mail, CPF e CNS identificam unicamente um usuário no banco local. | Alta |
| RN-002 | O cadastro só é concluído com aceite dos termos e da política de privacidade. | Alta |
| RN-003 | A senha deve atender ao mínimo estabelecido pelo formulário e ser confirmada antes do armazenamento. | Alta |
| RN-004 | Projetos e tarefas devem ser associados ao usuário autenticado; uma tela não deve exibir dados de outro usuário. | Alta |
| RN-005 | Toda tarefa deve pertencer a um projeto válido. | Alta |
| RN-006 | O logout deve limpar o estado de sessão mantido pelo serviço de autenticação. | Alta |
| RN-007 | Preferências só podem ser alteradas pelo usuário a quem pertencem. | Média |
| RN-008 | Dados incompletos não podem ser persistidos como se fossem válidos. | Alta |

## 2.5 Casos de uso

| ID | Caso de uso | Atores | Inclui | Exceções principais |
|---|---|---|---|---|
| UC-01 | Cadastrar usuário | Visitante | Validar campos, validar unicidade, registrar aceites | Dados inválidos, duplicidade, banco indisponível |
| UC-02 | Autenticar usuário | Usuário cadastrado | Buscar usuário, comparar senha | Usuário inexistente, senha inválida, erro de leitura |
| UC-03 | Consultar dashboard | Usuário autenticado | Carregar projetos e tarefas | Sessão expirada ou falha local |
| UC-04 | Gerenciar projetos | Usuário autenticado | Validar formulário, persistir projeto | Título vazio, falha de banco |
| UC-05 | Gerenciar tarefas | Usuário autenticado | Validar projeto, persistir tarefa | Projeto inexistente, prazo inválido |
| UC-06 | Consultar perfil | Usuário autenticado | Carregar dados do usuário | Usuário não encontrado |
| UC-07 | Configurar preferências | Usuário autenticado | Persistir preferência | Recurso não suportado ou falha local |
| UC-08 | Encerrar sessão | Usuário autenticado | Limpar sessão, redirecionar | Estado já inexistente |

## 2.6 Fluxos alternativos críticos

No login, se o e-mail não existir, o sistema informa que o usuário não foi encontrado e permanece na tela. Se a senha não corresponder, informa falha de autenticação sem revelar qual credencial está incorreta. Se o banco falhar, exibe mensagem amigável e não altera o estado de sessão. No cadastro, qualquer duplicidade deve ser tratada antes da inserção; uma falha após a validação não pode deixar um registro parcial.

## Referências

[1]: https://www.iso.org/standard/78176.html "ISO/IEC 25010"
[2]: https://www.w3.org/TR/WCAG21/ "WCAG 2.1"
[3]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
