# Catálogo visual dos diagramas

Esta pasta contém as versões PNG dos diagramas Mermaid mantidos na pasta [`/diagrams`](../../../diagrams). Cada imagem é uma representação renderizada de uma fonte editável e possui documentação complementar na [galeria HTML](../../galeria-diagramas.html).

| Imagem | Fonte editável | Tipo de visão | O que documenta | Estado |
|---|---|---|---|---|
| `arquitetura.png` | `diagrams/arquitetura.mmd` | Estrutural | Camadas, serviços, modelos e SQLite do MVP. | Atual |
| `casos-de-uso.png` | `diagrams/casos-de-uso.mmd` | Funcional | Atores, objetivos e relações `include`/`extend`. | Atual |
| `sequencia-login.png` | `diagrams/sequencia-login.mmd` | Dinâmica | Ordem das mensagens no login e cenários alternativos. | Atual |
| `atividades-autenticacao.png` | `diagrams/atividades-autenticacao.mmd` | Processo | Raias de Usuário, Front-end, Serviço e Banco. | Atual |
| `classes-dominio.png` | `diagrams/classes-dominio.mmd` | Estática | Entidades, serviços, DTO e multiplicidades. | Atual |
| `rastreabilidade.png` | `diagrams/rastreabilidade.mmd` | Governança | Caminho entre atores, casos de uso, componentes e dados. | Atual |
| `deployment-futuro.png` | `diagrams/deployment-futuro.mmd` | Implantação | Arquitetura candidata para evolução remota. | Futuro, não implementado |
| `plano-carga-seguranca.png` | `diagrams/plano-carga-seguranca.mmd` | Qualidade e segurança | Fluxo de dados sintéticos, k6, WAF, API, telemetria e gate de release. | Futuro, não implementado |

## Critério de documentação

Cada imagem deve responder a quatro perguntas: **o que representa**, **como deve ser lida**, **qual decisão apoia** e **quais requisitos ou testes se relacionam a ela**. A galeria HTML registra essas quatro dimensões em cards individuais e usa `alt` descritivo para apoiar acessibilidade.

## Atualização das imagens

Quando uma fonte `.mmd` for alterada, a imagem PNG correspondente deve ser renderizada novamente, revisada visualmente e atualizada junto com esta tabela. O commit deve explicar a motivação da mudança. As imagens são artefatos derivados; a fonte Mermaid é a referência editável.

## Convenção visual

A paleta utiliza azul profundo para estrutura e componentes, verde para serviços e laranja para dados. Essa convenção é consistente com a página HTML e ajuda a distinguir responsabilidades sem depender apenas de posição ou cor, pois as descrições textuais permanecem a fonte principal de interpretação.
