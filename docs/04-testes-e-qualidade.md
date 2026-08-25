# 4. Testes e qualidade

## 4.1 Estratégia

A estratégia combina testes unitários de serviços e validadores, testes de integração do acesso SQLite, testes de fluxo das telas e inspeção manual de usabilidade. O projeto de referência já registra testes para autenticação, banco, filtro de tarefas pendentes e validações de login e notificação; esta documentação organiza essas evidências e explicita os cenários negativos que devem permanecer cobertos.

A pirâmide recomendada é: muitos testes unitários rápidos, uma quantidade menor de testes de integração de persistência e poucos testes ponta a ponta dos fluxos críticos. Nenhum teste deve depender de dados pessoais reais. Fixtures e bancos temporários devem ser isolados por execução.

## 4.2 Critérios de entrada e saída

A execução começa quando o código compila, dependências estão declaradas e os dados de teste estão definidos. Uma release do MVP pode ser considerada candidata quando os fluxos Must passam, não há defeito crítico aberto, os testes de autenticação e persistência passam e a documentação de rastreabilidade está atualizada. A aprovação final depende do PO e do responsável técnico.

## 4.3 Casos de teste prioritários

| ID | Cenário | Pré-condição | Resultado esperado | Tipo |
|---|---|---|---|---|
| CT-001 | Cadastro válido | Banco inicializado e e-mail inédito | Usuário criado com aceites registrados | Unidade/integração |
| CT-002 | E-mail inválido | Formulário aberto | Mensagem de validação; nenhuma escrita | Unidade |
| CT-003 | E-mail duplicado | Usuário já existente | Cadastro rejeitado sem duplicação | Integração |
| CT-004 | CPF ou CNS duplicado | Registro existente | Cadastro rejeitado com conflito informado | Integração |
| CT-005 | Login válido | Usuário cadastrado | `currentUser` preenchido e dashboard acessível | Unidade/fluxo |
| CT-006 | Usuário inexistente | E-mail não cadastrado | Falha controlada sem vazamento de informação | Unidade |
| CT-007 | Senha inválida | E-mail cadastrado | Acesso negado e sessão inalterada | Unidade |
| CT-008 | Falha de banco no login | Adaptador configurado para falhar | Mensagem amigável e estado consistente | Unidade |
| CT-009 | Projeto válido | Usuário autenticado | Projeto associado ao usuário e listado | Integração |
| CT-010 | Projeto sem título | Formulário incompleto | Operação bloqueada | Unidade |
| CT-011 | Tarefa para projeto válido | Projeto existente | Tarefa criada e vinculada | Integração |
| CT-012 | Tarefa para projeto inexistente | Identificador inválido | Operação rejeitada | Integração |
| CT-013 | Isolamento de dados | Dois usuários com projetos | Cada um consulta apenas seus próprios dados | Segurança |
| CT-014 | Logout | Sessão ativa | Sessão limpa e retorno ao login | Fluxo |
| CT-015 | Preferência alterada | Usuário autenticado | Preferência persistida conforme capacidade implementada | Unidade |

## 4.4 Classes de equivalência e limites

| Campo | Classe válida | Classes inválidas/limites |
|---|---|---|
| E-mail | Formato válido e não duplicado | vazio, formato inválido, duplicado |
| Senha | Comprimento mínimo e confirmação igual | vazia, curta, confirmação divergente |
| Nome | Texto não vazio | vazio ou apenas espaços |
| CPF/CNS | Formato aceito e único | vazio, formato inválido, duplicado |
| Título de projeto/tarefa | Texto não vazio | vazio, apenas espaços, tamanho acima do limite definido |
| Data de tarefa | Nula quando opcional ou data válida | formato inválido, valor inconsistente |

## 4.5 Qualidade estática e cobertura

O material de referência registra execução automatizada e relatório de cobertura. A cobertura numérica não deve ser tratada como sinônimo de qualidade: além do percentual, o time deve verificar as regras de negócio, exceções, concorrência local, migrações e mensagens ao usuário. Como meta de evolução, recomenda-se cobertura mínima de 80% nos serviços e validadores críticos, com revisão de qualquer linha não coberta.

## 4.6 Defeitos e evidências

Cada defeito deve registrar reprodução, resultado esperado, resultado atual, severidade, evidência, ambiente, versão e vínculo com requisito. A evidência pode ser saída de teste, captura de tela ou log sanitizado. Senhas, tokens, CPF, CNS e dados pessoais não devem aparecer em anexos compartilhados.

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Casos de teste e automação do projeto de referência"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
