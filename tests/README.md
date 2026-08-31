# 🧪 Estratégia de testes do E-Project

Este diretório organiza os testes documentados que validam os fluxos representados no [`diagrama de sequência de login`](../diagrams/sequencia-login.mmd). O material separa **testes unitários**, que isolam regras e serviços, de **testes de integração**, que verificam a colaboração entre interface, serviço, repositório e SQLite.

> **Nota de transparência:** o repositório `Engenharia-de-Software-B` é a camada de especificação e governança. A implementação executável está no projeto de referência `projeto_pratico-eg`. Os casos abaixo são contratos de teste e critérios de aceitação preparados para execução nessa implementação ou em uma futura suíte automatizada.

## Organização

| Artefato | Finalidade |
|---|---|
| [`unitarios-auth.md`](unitarios-auth.md) | Testes unitários de validação, autenticação, DTO e controle de sessão. |
| [`integracao-auth.md`](integracao-auth.md) | Testes de integração envolvendo `AuthService`, repositório e SQLite. |
| [`carga-seguranca.md`](carga-seguranca.md) | Plano de carga, segurança, critérios, ambientes, evidências e referências. |
| [`k6-futuro.js`](k6-futuro.js) | Template k6 com stages, thresholds e resumo JSON para a futura API. |
| [`../docs/qualidade-e-testes.html`](../docs/qualidade-e-testes.html) | Painel visual com os testes, imagens e plano futuro. |

## Convenções de evidência

Cada execução deve registrar ID do teste, versão do código, ambiente, dados sintéticos, resultado esperado, resultado obtido, duração, logs sanitizados e link para a evidência. Nenhum relatório deve conter senhas, tokens, CPF, CNS ou dados pessoais reais.

## Critérios globais

A suíte deve cobrir o caminho feliz, entradas inválidas e falhas transitórias. A aprovação de uma release exige que todos os cenários `Must` passem, que não exista defeito crítico aberto, que a integração com persistência seja repetível e que os resultados de carga e segurança tenham sido avaliados por responsável técnico.

## Referências

[1]: https://owasp.org/www-project-web-security-testing-guide/ "OWASP Web Security Testing Guide"
[2]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP Application Security Verification Standard"
[3]: https://grafana.com/docs/k6/latest/ "Grafana k6 documentation"
