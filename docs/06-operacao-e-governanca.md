# 6. Operação e governança técnica

## 6.1 Segurança do MVP e limites

O MVP armazena dados localmente e utiliza o mecanismo documentado no projeto de referência para derivar e comparar senhas. Essa abordagem é suficiente para demonstrar o fluxo local, mas **SHA-256 simples não deve ser considerado uma política adequada para um serviço de autenticação de produção**. Antes de sincronização remota, devem ser adotados algoritmo específico para senhas com salt e custo configurável, proteção de sessão, TLS, controle de tentativas, recuperação segura e revisão de privacidade.

As consultas SQLite devem ser parametrizadas. A UI não deve exibir `passwordHash`, credenciais ou dados sensíveis em logs. O aplicativo deve minimizar os dados coletados, explicar a finalidade e exigir aceite dos termos e da política antes do cadastro. O risco de perda por dispositivo deve ser informado, pois o MVP não fornece backup centralizado.

## 6.2 Acessibilidade e UX

Cada tela deve possuir título semântico, rótulos associados aos campos, mensagens de erro próximas ao controle, foco visível, contraste suficiente, tamanho de texto legível e alternativa para ações que não dependam apenas de cor. Os fluxos de login, cadastro e criação de tarefa devem ser navegáveis por teclado quando a plataforma suportar esse modo. A avaliação deve seguir os princípios de conteúdo perceptível, operável, compreensível e robusto da WCAG 2.1.

A jornada recomendada começa no splash, segue para login ou cadastro, passa pelo dashboard, entra em projetos e tarefas e termina em perfil, preferências ou logout. Estados vazios devem explicar o próximo passo; estados de carregamento não devem parecer travamento; erros devem orientar correção sem expor detalhes internos.

## 6.3 Gerência de configuração

A baseline deve usar commits pequenos e descritivos, preferencialmente com convenção `feat:`, `fix:`, `docs:`, `test:`, `refactor:` e `chore:`. Alterações de requisito, arquitetura ou segurança devem ser vinculadas a uma RFC. A branch protegida de entrega deve receber somente mudanças revisadas.

| Elemento | Política |
|---|---|
| Baseline | Tag versionada e README atualizado |
| Mudança de requisito | RFC, impacto na RTM e aprovação do PO |
| Mudança arquitetural | ADR curta, revisão do arquiteto e teste de regressão |
| Mudança de segurança | Revisão técnica, cenários negativos e atualização de risco |
| Release | Testes aprovados, changelog, evidências e checksum opcional do pacote |
| Dados de teste | Sintéticos, versionáveis e sem segredos |

## 6.4 Pipeline recomendado

Mesmo que o MVP tenha sido validado localmente, a evolução deve automatizar análise estática, formatação, testes unitários, testes de integração, verificação de dependências e geração de relatório. O pipeline não deve publicar uma release se os testes Must falharem ou se houver segredo detectado no repositório.

## 6.5 Critérios de release

Uma release `v1.0.0-mvp` deve conter documentação, código de referência, testes executáveis, instruções de instalação, changelog, limitações conhecidas e indicação clara de que a persistência é local. Uma release futura só pode afirmar suporte remoto, disponibilidade, backup ou autenticação forte depois de evidenciar esses controles em ambiente correspondente.

## 6.6 Roadmap técnico

| Horizonte | Entrega | Pré-condição |
|---|---|---|
| Curto prazo | Completar testes de erro, persistência de preferências e migrações | Contratos e fixtures definidos |
| Médio prazo | Extrair repositórios, melhorar armazenamento de senha e adicionar exportação | Revisão de segurança e privacidade |
| Longo prazo | API remota, sincronização, autorização e backup | Modelo de ameaça, observabilidade e arquitetura aprovada |

## 6.7 Checklist de revisão

Antes da aprovação, confirme que o requisito possui critério de aceitação, que a história está ligada a teste, que as queries estão parametrizadas, que a UI não expõe dados sensíveis, que os fluxos alternativos estão documentados, que a documentação distingue fato de recomendação e que os riscos residuais foram aceitos pelo responsável competente.

## Referências

[1]: https://www.w3.org/TR/WCAG21/ "WCAG 2.1"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS"
[3]: https://semver.org/ "Semantic Versioning"
