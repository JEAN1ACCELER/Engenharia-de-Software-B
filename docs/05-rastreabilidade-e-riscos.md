# 5. Rastreabilidade e riscos

## 5.1 Matriz de rastreabilidade

A RTM permite localizar o impacto de uma mudança. O vínculo deve ser mantido quando um requisito evoluir: requisito → história/caso de uso → componente → teste → risco ou evidência.

| Requisito | História/caso de uso | Componentes | Testes | Risco relacionado |
|---|---|---|---|---|
| RF-001/RF-002 | US-02, UC-01 | SignupScreen, AuthService, DatabaseService | CT-001 a CT-004 | R-003 |
| RF-003/RF-004 | US-01, UC-02 | LoginScreen, AuthService | CT-005 a CT-008 | R-002 |
| RF-005 | US-03, UC-06 | ProfileScreen, AuthService | CT-013 | R-004 |
| RF-006/RF-007 | US-04/US-05, UC-04 | ProjectsScreen, Project, DatabaseService | CT-009/CT-010 | R-001 |
| RF-008/RF-009 | US-06/US-07, UC-05 | TasksScreen, Task, DatabaseService | CT-011/CT-012 | R-001 |
| RF-010 | US-08, UC-07 | SettingsScreen, estado de preferências | CT-015 | R-005 |
| RF-011 | US-02, UC-01 | SignupScreen, termos/política | CT-001 | R-003 |
| RF-012 | UC-08 | AuthService, Navigator | CT-014 | R-002 |
| RNF-002 | Todos os fluxos | Widgets e telas | inspeção WCAG | R-006 |
| RNF-004/RNF-005 | UC-01/UC-02 | AuthService, SQLite | CT-006/CT-007/CT-013 | R-003 |
| RNF-006/RNF-010 | UC-01 a UC-08 | Services e tratamento de erro | CT-008/CT-012 | R-001 |

## 5.2 Matriz de riscos

A pontuação é `P × I`, em escala de 1 a 5. Pontuações de 15 a 25 são críticas, de 8 a 14 são altas, de 4 a 7 são médias e de 1 a 3 são baixas. A classificação é uma ferramenta de priorização, não uma garantia estatística.

| ID | Risco | P | I | Escore | Mitigação preventiva | Contingência |
|---|---|---:|---:|---:|---|---|
| R-001 | Corrupção ou inconsistência do SQLite durante escrita relacionada | 3 | 5 | 15 | Transações, validação, migrações versionadas e testes de falha | Restaurar backup local quando existir; reconstruir banco e registrar perda de dados |
| R-002 | Sessão ou estado de autenticação inconsistente | 3 | 4 | 12 | Centralizar estado no AuthService, testar logout e estados de erro | Limpar sessão local e exigir novo login |
| R-003 | Exposição ou proteção insuficiente de credenciais | 3 | 5 | 15 | Não exibir hash, parametrizar SQL, revisar armazenamento e planejar algoritmo resistente a senha | Invalidar credenciais locais e emitir correção; para backend, rotação e reset obrigatório |
| R-004 | Exposição de dados de outro usuário por filtro incorreto | 2 | 5 | 10 | Filtrar por usuário autenticado, testes de isolamento e revisão de autorização | Bloquear release, corrigir consulta e avaliar impacto dos dados |
| R-005 | Preferências não persistirem após reinício | 3 | 2 | 6 | Definir contrato de armazenamento e teste de reabertura | Reverter para valores padrão e registrar limitação |
| R-006 | Interface inacessível ou confusa | 3 | 4 | 12 | Checklist WCAG, labels, foco, contraste e testes com teclado/leitor | Abrir débito de acessibilidade e impedir aceite como release final |
| R-007 | Dependência de pacote Flutter incompatível | 2 | 3 | 6 | Fixar versões, executar análise estática e manter changelog | Pin temporário, atualizar dependências e executar regressão |
| R-008 | Perda do dispositivo sem backup | 4 | 4 | 16 | Informar que dados são locais e planejar exportação/backup | Recuperação apenas a partir de cópia existente; comunicar limitação ao usuário |
| R-009 | Crescimento do escopo para colaboração online sem arquitetura adequada | 4 | 4 | 16 | Registrar fora do escopo, exigir RFC e revisão de arquitetura | Replanejar release e não improvisar autenticação/backend em tela |

## 5.3 Lições aprendidas

A primeira lição é separar explicitamente o que está implementado do que é recomendação futura. A segunda é que rastreabilidade não termina na lista de requisitos: ela precisa chegar ao teste e à evidência. A terceira é que um MVP local pode ser tecnicamente coerente, mas não deve receber atributos de disponibilidade, sincronização ou segurança de produção sem infraestrutura correspondente.

## 5.4 Revisão periódica

O PO e a equipe técnica devem revisar riscos a cada sprint e imediatamente após alteração de requisito, banco, autenticação ou dependência crítica. Riscos acima de 15 exigem responsável nomeado, prazo e aceite explícito do risco residual.

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Documentação de rastreabilidade do projeto de referência"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
