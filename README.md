# Comment Tree

API REST para gerenciamento de comentários associados a posts, desenvolvida com Node.js, Express 5 e TypeScript.

O projeto foi construído com foco no estudo de **middlewares**, **tipagem com TypeScript**, composição de rotas e controle de autorização em uma API HTTP.

## Tecnologias

- Node.js
- Express 5
- TypeScript
- tsx

As dependências e scripts disponíveis estão definidos no `package.json`. fileciteturn3file0L2-L2

## Funcionalidades

A API atualmente permite:

- Listar comentários de um post.
- Criar comentários.
- Excluir comentários.
- Verificar se o post existe antes de executar a operação.
- Identificar o usuário através do header `x-user-id`.
- Validar o conteúdo dos comentários.
- Verificar se o usuário é proprietário do comentário antes da exclusão.

A aplicação registra os dados em memória, sem banco de dados, utilizando arrays para posts e comentários. fileciteturn7file0L2-L2

## Estrutura

```text
src/
├── app.ts
├── datas.ts
├── types.ts
├── middlewares/
│   ├── checkCommentOwnership.ts
│   ├── checkPostExists.ts
│   ├── identifyUser.ts
│   └── validateCommentBody.ts
└── routes/
    └── comments.ts
```

A aplicação monta as rotas de comentários em `/posts/:postId/comments`. fileciteturn5file0L2-L2

## Como executar

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/GustavoGuerato/comment-tree.git
cd comment-tree
npm install
```

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado na porta `3000`. fileciteturn5file0L2-L2

## Endpoints

### GET `/posts/:postId/comments`

Retorna todos os comentários associados ao post informado.

Exemplo:

```http
GET /posts/1/comments
```

Resposta:

```json
[]
```

O `postId` precisa corresponder a um post existente. Caso contrário, a API retorna `404`. fileciteturn8file0L2-L2

### POST `/posts/:postId/comments`

Cria um novo comentário.

É necessário enviar o header `x-user-id` para identificar o usuário:

```http
POST /posts/1/comments
Content-Type: application/json
x-user-id: user-123
```

Body:

```json
{
  "text": "Meu primeiro comentário"
}
```

Resposta esperada:

```json
{
  "id": "uuid",
  "postId": "1",
  "userId": "user-123",
  "text": "Meu primeiro comentário"
}
```

O campo `text` deve ser uma string com entre 1 e 280 caracteres. fileciteturn10file0L2-L2

### DELETE `/posts/:postId/comments/:commentId`

Remove um comentário.

É necessário enviar o `x-user-id` correspondente ao proprietário do comentário:

```http
DELETE /posts/1/comments/{commentId}
x-user-id: user-123
```

A API verifica se o comentário existe e se pertence ao usuário identificado antes de removê-lo. fileciteturn11file0L2-L2

Em caso de sucesso, retorna `204 No Content`.

## Middleware

O projeto utiliza uma cadeia de middlewares para separar responsabilidades:

`checkPostExists` verifica a existência do post antes de continuar a requisição. fileciteturn8file0L2-L2

`identifyUser` obtém o usuário através do header `x-user-id` e adiciona `userId` ao objeto `request`. fileciteturn9file0L2-L2

`validateCommentBody` valida o campo `text` recebido no body da requisição. fileciteturn10file0L2-L2

`checkCommentOwnership` garante que somente o usuário proprietário possa excluir o comentário. fileciteturn11file0L2-L2

## Tipagem

Os principais modelos da aplicação são definidos em TypeScript:

```ts
interface Post {
  id: string;
  title: string;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
}
```

Também existe uma extensão de `Request` chamada `UserRequest`, utilizada para representar requisições que podem conter o `userId`. fileciteturn6file0L2-L2

## Status

Projeto em desenvolvimento e utilizado como estudo prático de **Node.js, Express, TypeScript e middlewares**.

## Licença

Este projeto está atualmente publicado sem uma licença especificada no repositório.