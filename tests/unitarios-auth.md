# 🧪 Testes unitários — autenticação e sessão

## Objetivo

Verificar cada regra do `AuthService` isoladamente, substituindo o acesso ao banco por um mock ou fake controlado. O teste unitário deve ser rápido, determinístico e incapaz de depender de rede, relógio real ou dados persistidos por outra execução.

## Casos de teste

| ID | Unidade | Cenário | Dado de entrada | Resultado esperado | Requisitos |
|---|---|---|---|---|---|
| UT-AUTH-001 | Validador de e-mail | E-mail válido | `ana@exemplo.com` | Validação aprovada | RF002 |
| UT-AUTH-002 | Validador de e-mail | Formato inválido | `ana@` | Mensagem de validação; serviço não é chamado | RF002 |
| UT-AUTH-003 | Validador de senha | Senha curta | Menos que o mínimo definido | Operação rejeitada | RF002, RN003 |
| UT-AUTH-004 | AuthService | Credencial válida | Usuário existente + senha correta | Retorna `UserResponseDTO`; define `currentUser` | RF004, RF005 |
| UT-AUTH-005 | AuthService | Usuário inexistente | E-mail sem registro | Falha controlada; sessão permanece vazia | RF004 |
| UT-AUTH-006 | AuthService | Senha inválida | E-mail existente + senha errada | Falha genérica; não retorna dados do usuário | RF004, RNF002 |
| UT-AUTH-007 | AuthService | Banco lança exceção | Repositório com erro | Resultado de indisponibilidade; exceção não chega à UI | RNF006 |
| UT-AUTH-008 | AuthService | Logout com sessão ativa | `currentUser` preenchido | Sessão limpa | RF014, RN006 |
| UT-AUTH-009 | AuthService | Logout sem sessão | `currentUser = null` | Operação idempotente | RF014 |
| UT-AUTH-010 | Mapper/DTO | Conversão segura | Entidade com `passwordHash` | DTO não contém `passwordHash` | RF011, RNF002 |

## Exemplo de contrato em pseudocódigo

```text
arrange:
  repository.findByEmail retorna usuário e hash esperado
  passwordHasher.compare retorna true

act:
  resultado = authService.login(email, senha)

assert:
  resultado é UserResponseDTO
  resultado não contém passwordHash
  authService.currentUser.id corresponde ao usuário
```

## Testes de propriedades importantes

O resultado de credenciais inválidas deve ser indistinguível entre e-mail inexistente e senha errada quando a ameaça de enumeração de usuários for relevante. Nenhuma entrada inválida deve chamar o repositório. O logout deve poder ser executado mais de uma vez sem lançar erro. O DTO deve permanecer seguro mesmo que a entidade interna contenha novos campos sensíveis.

## Critério de aprovação

Todos os testes `UT-AUTH-001` a `UT-AUTH-010` devem passar. A cobertura de linhas é um indicador complementar; a aprovação depende também da cobertura de decisões, exceções e regras de segurança. Falhas que exibam credenciais ou permitam sessão após autenticação inválida bloqueiam a release.

## Referências

[1]: https://owasp.org/www-project-application-security-verification-standard/ "OWASP ASVS — requisitos de segurança verificáveis"
[2]: https://owasp.org/www-project-web-security-testing-guide/ "OWASP WSTG — guia de testes de segurança"
