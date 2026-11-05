# Star Stories

Aplicação para registrar, consultar e organizar histórias no formato **STAR**, com criação, edição, exclusão e busca por título ou tags.

Este repositório representa o **MVP** do projeto: um fluxo completo de gerenciamento de histórias, com interface React, API Express e persistência local em SQLite.

## O formato STAR

Cada história descreve uma experiência em quatro partes:

- **Situação:** o contexto e o problema enfrentado.
- **Tarefa:** a responsabilidade ou o objetivo a alcançar.
- **Ação:** as ações realizadas para resolver a situação.
- **Resultado:** os efeitos e aprendizados obtidos.

Além dos campos STAR, a história possui título, identificador e tags para organização e busca.

## Funcionalidades do MVP

- Criar uma história e abrir sua página após salvar.
- Consultar uma história pelo ID.
- Visualizar título, ID, campos STAR e tags.
- Editar uma história em formulário preenchido com seus dados atuais.
- Excluir uma história mediante confirmação.
- Buscar trechos presentes no título ou em qualquer tag.
- Exibir resultados em cards com título e tags, com acesso à história completa.
- Manter o termo de busca na URL.
- Preservar histórias após reiniciar o backend.
- Apresentar estados de carregamento, erros e buscas sem resultados.

## Tecnologias

| Camada                     | Tecnologias                             |
| Interface                  | React, React Router e CSS               |
| Desenvolvimento do frontend| Vite e Oxlint                           |
| API                        | Node.js e Express                       |
| Persistência               | SQLite, via módulo nativo `node:sqlite` |
| Desenvolvimento do backend | Nodemon                                 |

## Requisitos

- Node.js com suporte a `node:sqlite` e compatível com as dependências do Vite.
- npm.

A referência usada no desenvolvimento foi o **Node.js 25.2.1**. Nessa versão, `node:sqlite` pode emitir um aviso de recurso experimental. Não é necessário instalar um servidor SQLite separado.

## Como executar

Os comandos abaixo partem da raiz do repositório. Backend e frontend possuem dependências próprias e devem rodar em terminais separados.

### Backend

```sh
cd backend
npm ci
npm run dev
```

A API atende em `http://localhost:3000`.

Na primeira inicialização, a aplicação cria o diretório de dados, o banco e sua estrutura automaticamente. Nas seguintes, reutiliza o arquivo existente.

Para iniciar sem o Nodemon:

```sh
npm start
```

### Frontend

Em outro terminal, a partir da raiz:

```sh
cd frontend
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

Durante o desenvolvimento, o frontend chama `/api/stories`. O proxy configurado no Vite encaminha essas requisições para `http://localhost:3000/stories`, removendo o prefixo `/api`.

### Outros comandos do frontend

Execute dentro de `frontend`:

```sh
npm run lint
npm run build
npm run preview
```

`build` gera os arquivos em `frontend/dist`; `preview` permite inspecionar esse build localmente. Para publicar a aplicação, ainda é necessário definir hospedagem, encaminhamento da API e suporte às rotas do React Router.

## Navegação

| Rota                | Página                   |
| ---                 | ---                      |
| `/`                 | Início e consulta por ID |
| `/stories/new`      | Criação de história      |
| `/stories/:id`      | Exibição de história     |
| `/stories/:id/edit` | Edição de história       |
| `/search?q=termo`   | Busca por título ou tags |

Criação e edição compartilham o componente `StoryForm`. A consulta de uma história é compartilhada pelo hook `useStory`.

## API

URL base local: `http://localhost:3000`.

| Método | Endpoint | Resultado de sucesso |
| --- | --- | --- |
| POST | `/stories` | `201` com a história criada |
| GET | `/stories/search?q=termo` | `200` com uma lista de histórias |
| GET | `/stories/:id` | `200` com a história |
| PUT | `/stories/:id` | `200` com a história atualizada |
| DELETE | `/stories/:id` | `204`, sem corpo |

### Criar história

Envie `Content-Type: application/json` e um corpo como:

```json
{
  "title": "Automatização de entregas",
  "situation": "A preparação de versões era manual e demorada.",
  "task": "Reduzir o tempo de preparação e os erros operacionais.",
  "action": "Automatizei as verificações e documentei o processo.",
  "result": "O tempo de preparação caiu de duas horas para trinta minutos.",
  "tags": ["automação", "processos"]
}
```

O backend gera o `id` e o inclui na resposta. Título e campos STAR devem ser textos não vazios. As tags são opcionais na criação e, quando fornecidas, devem ser um array de textos não vazios.

### Atualizar história

O PUT substitui todos os campos mutáveis de uma história existente. Envie o objeto completo, com os campos da criação, `tags` e `id`.

- O `id` do corpo deve ser igual ao parâmetro da URL.
- Campos obrigatórios omitidos ou inválidos produzem `400`.
- Use `tags: []` para remover todas as tags.
- Um ID inexistente produz `404`; o PUT não cria uma história nova.

### Buscar histórias

Exemplo:

```text
GET /stories/search?q=lider
```

A busca procura o trecho informado no título ou em cada tag. Uma história aparece apenas uma vez, mesmo que corresponda em vários campos. Os resultados são ordenados por título e, em seguida, por ID.

- Sem correspondências: `200` com `[]`.
- Termo ausente ou vazio: `400`.
- Expressões com espaços são buscadas como um trecho inteiro.
- Os campos situação, tarefa, ação e resultado não participam da busca.
- A busca não remove acentos. O `LIKE` padrão do SQLite ignora diferenças de caixa para letras ASCII, mas não oferece equivalência completa de maiúsculas e minúsculas para caracteres acentuados.
- Não há paginação no MVP.

### Excluir história

O DELETE remove o registro definitivamente. Uma exclusão bem-sucedida retorna `204`, sem JSON. Excluir um ID inexistente retorna `404`.

### Erros

Os erros tratados pela aplicação usam o formato:

```json
{
  "error": "Mensagem do erro"
}
```

São utilizados `400` para validação, `404` para história inexistente e `500` para falhas inesperadas. Uma busca vazia é uma resposta válida, não um erro.

## Persistência e Git

Os dados são armazenados em:

```text
backend/data/star-stories.db
```

Toda história cadastrada pela interface, inclusive durante verificações manuais, é gravada nesse banco e permanece após reiniciar o backend.

O diretório `/backend/data/` e os arquivos `*.db` estão ignorados pelo Git. Portanto, as histórias locais não são incluídas nos commits normais. O `.gitignore` não remove arquivos que já estejam versionados e pode ser contornado por uma inclusão forçada.

Para conferir a regra aplicada:

```sh
git check-ignore -v backend/data/star-stories.db
```

As migrações `.sql` são versionadas: contêm a estrutura necessária para criar o banco, sem incluir as histórias locais. Outra pessoa que clonar o projeto terá um banco vazio criado ao iniciar o backend.

A primeira migração é aplicada em uma transação e sua versão é registrada com `PRAGMA user_version`.

## Organização do projeto

```text
backend/
  src/
    application/
      services/          # Geração de IDs
      use-cases/         # Criação, consulta, edição, exclusão e busca
    infrastructure/
      database/          # Conexão SQLite e migrações
      repositories/      # Implementações SQLite e em memória
    main/                # Servidor e montagem das dependências
    models/              # Story e erros da aplicação
    presentation/
      controllers/       # Requisições e respostas HTTP
      routes/            # Endpoints Express
frontend/
  src/
    api/                 # Comunicação HTTP com o backend
    components/          # Formulário compartilhado e cards
    hooks/               # Consulta de história
    pages/               # Telas da aplicação
```

O backend separa validação do modelo, coordenação dos casos de uso, persistência e apresentação HTTP. O container monta as dependências. O SQLite é o repositório utilizado pela aplicação; a implementação em memória permanece disponível no código.

## Validação manual do MVP

Com os dois servidores em execução, pela interface:

1. Crie uma história e confira os dados e o ID na exibição.
2. Consulte o mesmo ID pela página inicial.
3. Edite um campo e confirme que os demais foram preservados.
4. Reinicie o backend e consulte novamente a história para verificar a persistência.
5. Busque por um trecho do título e por uma tag; abra um dos cards.
6. Busque um termo sem correspondências e confira a mensagem de nenhum resultado.
7. Exclua uma história, confirme o retorno ao início e consulte o ID excluído.

O MVP ainda não possui uma suíte de testes automatizados. O script `test` do backend é o placeholder inicial e retorna erro.

## Escopo atual

Esta versão foi preparada para uso e desenvolvimento local. Ainda não há autenticação, separação de histórias por usuário, paginação, busca sem acentos ou configuração de implantação em produção. Todos os clientes que acessam a mesma API utilizam o mesmo conjunto de histórias.
