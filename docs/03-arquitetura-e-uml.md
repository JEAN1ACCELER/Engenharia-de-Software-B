# 3. Arquitetura e UML

## 3.1 Decisão arquitetural

O MVP adota **arquitetura em camadas**: apresentação, serviços de negócio, modelos e persistência. A decisão é proporcional ao escopo local e mantém as responsabilidades separadas sem introduzir infraestrutura desnecessária. A camada de negócio não deve depender de widgets; a UI consome serviços e modelos por meio do Provider; a persistência fica encapsulada no `DatabaseService`.

| Camada | Responsabilidade | Elementos de referência |
|---|---|---|
| Apresentação | Renderizar telas, capturar eventos e apresentar estados | Splash, Login, Signup, Dashboard, Projects, Tasks, Profile, Settings |
| Estado e aplicação | Expor estado observável e orquestrar o fluxo | Provider, `AuthService`, `DatabaseService` |
| Domínio/modelos | Representar dados e invariantes | `User`, `Project`, `Task` |
| Persistência | Criar schema, executar operações e manter relações | SQLite, queries parametrizadas |

A evolução para API remota deve preservar essa separação e substituir o adaptador de persistência por uma porta/implementação remota, sem misturar chamadas HTTP diretamente nas telas.

## 3.2 Componentes e responsabilidades

`AuthService` valida credenciais, controla `currentUser`, registra e encerra sessão. `DatabaseService` inicializa o banco, cria tabelas e executa operações de usuários, projetos e tarefas. As telas são responsáveis por interação e composição visual, não por SQL. Os modelos traduzem registros para objetos usados pela aplicação.

O padrão **Repository/Adapter** é recomendado como evolução do `DatabaseService`, especialmente quando a aplicação ganhar testes com doubles, sincronização ou mais de uma fonte de dados. O padrão **Mapper** deve ser adotado se entidades persistidas e objetos de tela deixarem de ser equivalentes. O padrão **Observer** já aparece conceitualmente no `ChangeNotifier`/Provider para atualizar a UI quando o estado muda.

## 3.3 Modelo de dados

O schema documentado no projeto de referência contém as tabelas `users`, `passwords`, `projects` e `tasks`. As chaves estrangeiras ligam projeto ao usuário e tarefa ao projeto. A separação da tabela de senhas evita misturar diretamente o segredo derivado com os dados de perfil, embora a estratégia criptográfica precise ser fortalecida antes de qualquer uso fora do dispositivo.

```sql
users(id, name, email UNIQUE, cpf UNIQUE, cns UNIQUE, role, createdAt,
      acceptedTerms, acceptedPrivacy)
passwords(email PRIMARY KEY, passwordHash)
projects(id, userId FK users.id, title, description, status, createdAt)
tasks(id, projectId FK projects.id, title, description, status, dueDate, createdAt)
```

As operações de leitura e escrita devem usar parâmetros, transações quando houver múltiplas alterações relacionadas e tratamento explícito de erro. Exclusões e migrações futuras precisam definir política de integridade referencial, especialmente para projetos com tarefas.

## 3.4 Fluxos principais

### Autenticação

```text
LoginScreen
  -> AuthService.login(email, senha)
  -> DatabaseService.getUserByEmail(email)
  -> SQLite
  -> comparação do derivado da senha
  -> AuthService.currentUser = usuário
  -> navegação para DashboardScreen
```

### Criação de projeto

```text
ProjectsScreen
  -> validação do formulário
  -> DatabaseService.insertProject(project)
  -> SQLite
  -> atualização do estado
  -> ProjectsScreen renderiza a lista
```

### Criação de tarefa

```text
TasksScreen
  -> validação de projeto e campos
  -> DatabaseService.insertTask(task)
  -> SQLite
  -> atualização do estado
  -> TasksScreen renderiza a tarefa
```

## 3.5 Casos de uso e sequências

No caso `UC-02 Autenticar usuário`, a sequência deve conter os fragmentos `alt` para credencial válida, usuário inexistente, senha inválida e falha de banco. A UI recebe um resultado ou DTO seguro, jamais o registro de senha bruto. No caso `UC-01 Cadastrar`, o fluxo inclui validação de formato, unicidade, aceite de termos, criação de usuário e criação do derivado de senha.

## 3.6 Classes conceituais

| Classe | Atributos principais | Relacionamentos |
|---|---|---|
| `User` | id, name, email, cpf, cns, role, createdAt, aceites | possui 0..N projetos; possui credencial |
| `Project` | id, userId, title, description, status, createdAt | pertence a 1 usuário; possui 0..N tarefas |
| `Task` | id, projectId, title, description, status, dueDate, createdAt | pertence a 1 projeto |
| `AuthService` | currentUser, estado de sessão | usa `DatabaseService` |
| `DatabaseService` | conexão, operações CRUD | persiste modelos |

Um cenário válido é: o usuário autenticado cria o projeto “Trabalho Prático” e associa a tarefa “Documentar arquitetura”. A multiplicidade esperada é `User 1 — N Project` e `Project 1 — N Task`; nenhuma tarefa deve existir sem projeto.

## 3.7 Decisões e trade-offs

A persistência local simplifica instalação, testes e demonstração, mas não oferece backup automático, sincronização ou recuperação em caso de perda do dispositivo. Provider é suficiente para o MVP, mas um crescimento grande de estado pode demandar uma abordagem mais explícita. SQLite é adequado para relações locais; uma futura API deve preservar o contrato de domínio e introduzir autenticação robusta, autorização e observabilidade de servidor.

## Referências

[1]: https://github.com/JEAN1ACCELER/projeto_pratico-eg "Arquitetura e implementação de referência"
[2]: https://martinfowler.com/articles/injection.html "Inversão de dependência e separação de responsabilidades"
