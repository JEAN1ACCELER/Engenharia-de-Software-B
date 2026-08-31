# ⚡🛡️ Plano de testes de carga e segurança — implantação futura

## 1. Objetivo e escopo

Este plano se aplica somente à futura arquitetura remota representada em [`deployment-futuro.mmd`](../diagrams/deployment-futuro.mmd). Ela prevê cliente, CDN/WAF, API REST, provedor de identidade, serviços de aplicação, PostgreSQL, réplica de leitura, broker de eventos, notificações e backup.

O objetivo é demonstrar que a plataforma suporta o volume acordado, degrada de forma controlada e resiste a classes prioritárias de abuso. A execução deve ocorrer em ambiente autorizado, com dados sintéticos e janela aprovada. Nunca executar carga agressiva ou exploração contra produção sem autorização formal.

O [Grafana k6][3] é uma opção para carga, stress, spike, soak e automação de performance. Para segurança, o [OWASP WSTG][1] fornece um guia abrangente de testes de aplicações e serviços web, enquanto o [OWASP ASVS][2] organiza controles verificáveis para desenvolvimento e avaliação.

## 2. Ambientes e dados

| Ambiente | Uso | Requisito |
|---|---|---|
| Local | Smoke e testes unitários de cliente/serviço | Sem tráfego distribuído. |
| Staging | Carga, integração e segurança autorizada | Topologia próxima da futura produção e dados sintéticos. |
| Pré-produção | Regressão final e ensaio de recuperação | Observabilidade e controles equivalentes à produção. |
| Produção | Apenas smoke, sintético e monitoramento | Sem pentest ou stress sem aprovação e janela formal. |

A massa deve representar usuários, projetos, tarefas, sessões e consultas realistas, sem CPF, CNS, senha ou token real. Todos os tokens de teste devem expirar e ser revogados após a execução.

## 3. Modelo de carga

### 3.1 Perfis de tráfego

| Perfil | Descrição | Duração | Objetivo |
|---|---|---:|---|
| Smoke | 1–5 usuários virtuais, fluxos essenciais | 5 min | Verificar conectividade e contrato. |
| Baseline | Carga nominal acordada | 15 min | Medir p50, p95, p99 e taxa de erro. |
| Load | Crescimento gradual até pico esperado | 30 min | Confirmar SLO sob operação normal. |
| Stress | Aumento além do pico | Até degradação controlada | Identificar limite e comportamento de fila. |
| Spike | Salto rápido de tráfego | 10 min | Avaliar autoscaling, filas e recuperação. |
| Soak | Carga nominal sustentada | 2–8 h | Encontrar vazamentos, degradação e acúmulo. |
| Recovery | Retorno após falha controlada | 15–30 min | Verificar recuperação e backlog de eventos. |

### 3.2 Jornadas exercitadas

O cenário principal deve misturar login, consulta do dashboard, listagem de projetos, leitura de tarefas, criação de projeto, criação de tarefa e logout. A proporção inicial sugerida é 35% leitura de dashboard, 25% listagem de projetos/tarefas, 15% login, 15% criação de dados e 10% logout; o PO deve validar essa distribuição com telemetria real antes do teste definitivo.

### 3.3 Métricas

| Camada | Métricas mínimas |
|---|---|
| Cliente/CDN | Tempo de carregamento, erros de rede, cache hit ratio e tamanho transferido. |
| API | RPS, latência p50/p95/p99, 4xx, 5xx, timeouts e saturação de workers. |
| Identidade | Latência de login, falhas, throttling, sessões ativas e tentativas bloqueadas. |
| Aplicação | CPU, memória, GC, filas, eventos publicados e falhas de dependência. |
| PostgreSQL | Conexões, locks, I/O, CPU, latência de queries, cache hit e replicação. |
| Broker/notificações | Profundidade da fila, idade da mensagem, throughput, retries e dead letters. |
| Backup | Duração, sucesso, idade do último backup e teste de restauração. |

### 3.4 Critérios de saída preliminares

Os valores abaixo são **metas de planejamento**, não resultados medidos. Devem ser confirmados pelo responsável pelo produto antes do teste:

| Indicador | Meta inicial |
|---|---:|
| Taxa de erro no cenário nominal | < 1% |
| Latência p95 das leituras principais | ≤ 2 s |
| Latência p99 das leituras principais | ≤ 4 s |
| Erros HTTP 5xx | < 0,5% |
| Recuperação após spike | Retornar à baseline em até 10 min |
| Crescimento de memória no soak | Sem tendência contínua não explicada |
| Perda de eventos | 0 eventos confirmados como perdidos |

Nenhum número deve ser publicado como SLO de produção sem evidência do ambiente, perfil de tráfego e janela de medição.

## 4. Plano de segurança

### 4.1 Controles preventivos

| Área | Verificação |
|---|---|
| Identidade | MFA quando aplicável, expiração de sessão, revogação, proteção contra enumeração e throttling. |
| Autorização | Usuário só acessa seus projetos/tarefas; testar IDOR/BOLA em cada recurso. |
| Entrada | Validação de schema, limites de tamanho, encoding e consultas parametrizadas. |
| API | TLS, autenticação consistente, CORS restritivo, rate limiting, headers e versionamento. |
| Segredos | Nenhum segredo no repositório, logs, imagem de contêiner ou resposta HTTP. |
| Banco | Privilégio mínimo, isolamento, criptografia, backups e conexão segura. |
| Eventos | Autenticidade, idempotência, retry limitado, dead letter e proteção contra replay. |
| WAF/CDN | Regras contra abuso, observação de falsos positivos e caminho de bypass testado. |
| Dependências | SCA, atualização controlada, SBOM e análise de vulnerabilidades. |
| Observabilidade | Logs estruturados, correlação, alertas e sanitização de dados pessoais. |

### 4.2 Casos de segurança

| ID | Teste | Resultado esperado | Referência |
|---|---|---|---|
| SEC-001 | SQL/NoSQL injection nas entradas | Entrada tratada como dado; sem alteração ou acesso indevido | WSTG-2024-INPV |
| SEC-002 | BOLA/IDOR em projetos e tarefas | Usuário não acessa recurso de outro usuário | ASVS v5, controle de autorização |
| SEC-003 | Brute force e credential stuffing | Throttling, alerta e bloqueio progressivo sem DoS do usuário | ASVS v5, autenticação |
| SEC-004 | Token expirado, revogado ou alterado | API rejeita com resposta segura e sem dados | ASVS v5, sessão |
| SEC-005 | XSS e conteúdo malicioso | Saída codificada e política aplicável | WSTG, validação de entrada |
| SEC-006 | CORS e headers | Apenas origens e métodos aprovados | WSTG, configuração |
| SEC-007 | Upload ou payload excessivo | Limite, validação e rejeição controlada | WSTG, validação |
| SEC-008 | TLS e certificados | Protocolo e cadeia válidos; sem downgrade inseguro | ASVS v5, comunicação |
| SEC-009 | Segredos em pipeline/logs | Scanner não encontra credenciais; logs sanitizados | ASVS v5, configuração |
| SEC-010 | Dependências vulneráveis | Falha crítica bloqueia release ou possui aceite formal | Processo de supply chain |
| SEC-011 | Replay de evento | Idempotência impede duplicação de efeito | Arquitetura de eventos |
| SEC-012 | DDoS/abuso controlado | WAF/rate limit absorve teste autorizado e alerta operação | WSTG e arquitetura |

### 4.3 Segurança operacional

O teste deve possuir escopo, janela, contatos de emergência, limites de tráfego, critérios de abortamento e plano de reversão. O time deve parar imediatamente ao detectar impacto em terceiros, degradação não prevista, risco de perda de dados ou comportamento fora do escopo autorizado. O relatório deve classificar achados por severidade, evidência, impacto, reprodução, correção e risco residual.

## 5. Execução e automação

O pipeline futuro deve executar smoke após o deploy, carga baseline em staging e verificações de segurança em cada mudança relevante. O teste de stress e o soak precisam ser agendados, não executados em todo commit. Os limites devem ser implementados como thresholds automatizados para que uma regressão impeça a promoção.

Exemplo conceitual de threshold:

```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000', 'p(99)<4000'],
  },
};
```

O trecho é um ponto de partida e não substitui a definição de URLs, autenticação de teste, dados, teardown, correlação de tokens, tags, métricas de negócio e limites aprovados.

## 6. Entregáveis

| Entregável | Conteúdo mínimo |
|---|---|
| Plano aprovado | Escopo, ambiente, carga, segurança, contatos e abortamento. |
| Scripts versionados | Cenários, dados sintéticos, thresholds e configuração. |
| Dashboard | Latência, erros, RPS, infraestrutura, filas e banco. |
| Relatório de carga | Perfil, resultados, gargalos, limites e recomendações. |
| Relatório de segurança | Achados, evidências, severidade, correção e reteste. |
| Gate de release | Aprovação PO, arquitetura, QA e segurança; riscos residuais aceitos. |

## Referências

[1]: https://owasp.org/www-project-web-security-testing-guide/ "OWASP Web Security Testing Guide"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP Application Security Verification Standard 5.0"
[3]: https://grafana.com/docs/k6/latest/ "Grafana k6 documentation"
[4]: https://github.com/OWASP/wstg/blob/v4.2/document/README.md "OWASP WSTG v4.2 — versão referenciada"
