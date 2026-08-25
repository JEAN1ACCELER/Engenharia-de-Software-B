# 7. Complemento profissional e artefatos de evolução

## 7.1 Como o segundo material foi incorporado

O segundo material fornece uma referência de maturidade para um sistema de reservas de laboratórios: cadeia de custódia documental, RACI, requisitos com prioridade e complexidade, RNF por qualidade, UML com fluxos alternativos, DTOs, arquitetura 3-tier/hexagonal, padrões GoF, jornadas UX, riscos com P × I, RTM e atas. Esses controles são aplicáveis ao E-Project como **práticas de engenharia**, mas o domínio de laboratórios, reservas, alunos e professores não foi incorporado como se fosse funcionalidade existente.

Essa separação evita um erro comum: copiar exemplos de domínio e criar requisitos incompatíveis com o produto real. Caso o projeto seja futuramente transformado em um sistema de reservas, esta seção pode servir de ponto de partida para uma nova baseline, com atores, entidades e requisitos próprios.

## 7.2 Ficha técnica e cadeia de custódia

| Campo | Valor |
|---|---|
| Produto | E-Project |
| Artefato | Especificação e governança de Engenharia de Software B |
| Versão | 1.1.0 |
| Data da revisão | 25 de agosto de 2026 |
| Fonte funcional | `projeto_pratico-eg`, consultado em modo somente leitura |
| Escopo | MVP local de projetos e tarefas |
| Responsável pela elaboração | Manus AI |
| Aprovador de produto | Pendente de validação do responsável pelo projeto |
| Aprovador técnico | Pendente de validação do responsável técnico |
| Integridade | O checksum deve ser calculado sobre o pacote final publicado, não sobre este campo antes da publicação |

O checksum é um mecanismo de detecção de alteração acidental, não uma assinatura digital nem prova de autoria. Para auditoria formal, o arquivo deve ser assinado pela autoridade competente e o algoritmo escolhido deve ser adequado ao objetivo de integridade.

## 7.3 Guia de navegação por perfil

| Perfil | Leitura recomendada | Decisão que a documentação apoia |
|---|---|---|
| PO/cliente | README, requisitos e rastreabilidade | Confirmar escopo, prioridade e aceite |
| Desenvolvimento | Requisitos, arquitetura e diagramas | Implementar sem violar responsabilidades |
| QA | Requisitos, casos de teste e RTM | Verificar comportamento e cobertura |
| Arquitetura/infraestrutura | Arquitetura, operação, riscos e roadmap | Avaliar evolução para backend remoto |
| Gestão | Visão, RACI, riscos e histórico | Acompanhar exposição, decisões e aprovações |
| Novos integrantes | Visão, glossário e jornada UX | Reduzir tempo de onboarding |

## 7.4 Padrões de projeto aplicáveis

| Categoria | Padrão | Aplicação no E-Project | Limite |
|---|---|---|---|
| Arquitetural | Layered Architecture | UI, serviços, modelos e persistência | Não confundir camadas com microserviços |
| Arquitetural | Ports and Adapters | Isolar SQLite de uma futura API | Recomendado quando houver segunda fonte de dados |
| GoF | Observer | Provider/ChangeNotifier atualiza telas após mudanças | Evitar eventos globais sem contrato |
| GoF | Strategy | Permitir diferentes ordenações ou filtros de tarefas | Não introduzir abstração para um único algoritmo simples |
| GoF | Factory Method | Criar adaptadores de notificação em evolução futura | Notificações não fazem parte do MVP atual |
| Corporativo | Repository | Encapsular acesso a dados e facilitar testes | Pode ser extraído do `DatabaseService` gradualmente |
| Corporativo | DTO + Mapper | Impedir que credenciais ou campos internos cheguem à UI | Preferível quando modelos de domínio e tela divergirem |

Singleton para conexão deve ser usado com cautela: uma instância compartilhada pode simplificar o ciclo de vida local, mas não deve esconder dependências nem impedir testes isolados. A escolha precisa ser documentada como decisão técnica, não aplicada por hábito.

## 7.5 Especificação profissional de caso de uso

| Campo | UC-02 — Autenticar usuário |
|---|---|
| Ator principal | Usuário cadastrado |
| Pré-condições | Aplicação inicializada; formulário de login disponível |
| Pós-condição de sucesso | Sessão preenchida e dashboard exibido |
| Fluxo principal | Informar e-mail; informar senha; validar campos; consultar usuário; comparar derivado; criar sessão; navegar |
| Fluxo alternativo A1 | E-mail inexistente: informar falha genérica e permanecer no login |
| Fluxo alternativo A2 | Senha inválida: incrementar contador local se aplicável, negar acesso e manter sessão vazia |
| Fluxo alternativo A3 | Timeout ou falha de banco: exibir mensagem amigável e permitir nova tentativa |
| Pontos de extensão | Recuperação de senha e autenticação remota somente em release futura |
| Requisitos associados | RF-003, RF-004, RF-012, RNF-004, RNF-006 |
| Testes associados | CT-005, CT-006, CT-007, CT-008, CT-014 |

O mesmo modelo deve ser utilizado para cadastro, projetos, tarefas, perfil e preferências. Cada caso deve explicitar exceções, pontos de extensão e evidência esperada.

## 7.6 Jornadas UX do E-Project

| Etapa | Usuário novo | Usuário recorrente |
|---|---|---|
| Descoberta | Entende o propósito no splash e escolhe cadastro | Reconhece a aplicação e procura login |
| Entrada | Preenche dados e aceita termos | Informa credenciais |
| Primeiro valor | Cria o primeiro projeto | Consulta dashboard e tarefas pendentes |
| Acompanhamento | Aprende a navegar entre projeto e tarefa | Atualiza o trabalho e revisa prazos |
| Retenção | Configura preferências | Mantém rotina de consulta |
| Saída | Encerra ou continua após feedback | Faz logout quando necessário |

A checklist de cada tela deve verificar contraste, foco, labels, mensagens de erro, tamanho de toque, leitura por tecnologia assistiva, estado vazio e prevenção contra perda de dados.

## 7.7 Ata de reunião e decisões

### Modelo de ata

| Campo | Registro |
|---|---|
| Data e horário | A preencher |
| Participantes | A preencher |
| Objetivo | A preencher |
| Decisões | A preencher |
| Requisitos impactados | A preencher |
| Riscos impactados | A preencher |
| Próximos passos | A preencher |
| Responsável por cada passo | A preencher |
| Prazo de cada passo | A preencher |
| Aprovadores | A preencher |

### Registro inicial de decisão

Em 25 de agosto de 2026, foi registrada a decisão de manter o E-Project como MVP local com SQLite, Provider e serviços separados, em vez de introduzir Firebase ou uma API remota sem requisito aprovado. O próximo passo é validar com o responsável pelo projeto se a evolução desejada continua sendo gerenciamento de projetos e tarefas ou se haverá mudança de domínio. Uma eventual mudança exige nova baseline de requisitos, arquitetura e riscos.

## 7.8 Requisitos de evolução condicionais

Os requisitos abaixo são **candidatos de uma futura plataforma remota**, não itens aceitos do MVP atual. Eles preservam as recomendações do segundo material sem falsificar o estado do produto.

| ID candidato | Requisito futuro | Dependência |
|---|---|---|
| ER-001 | Autenticar via provedor de identidade com sessão expirada e controle de tentativas | API, TLS, provedor de identidade e modelo de ameaça |
| ER-002 | Expor API REST documentada com OpenAPI | Contrato de recursos e versionamento |
| ER-003 | Armazenar senha com algoritmo apropriado para senha, salt e custo configurável | Migração e política de credenciais |
| ER-004 | Disponibilizar backup e restauração com RPO/RTO definidos | Banco remoto, monitoramento e plano de continuidade |
| ER-005 | Operar com metas de disponibilidade e carga formalmente medidas | Ambiente de produção e teste de carga |

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Projeto de referência"
[2]: https://www.w3.org/TR/WCAG21/ "WCAG 2.1"
[3]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
[4]: https://spec.openapis.org/oas/latest.html "OpenAPI Specification"
