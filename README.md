# Comment Tree

API REST simples para gerenciamento de comentários associados a posts, desenvolvida com Node.js, Express 5 e TypeScript.

Este é um projeto de estudo, feito para fixar conceitos de roteamento e middlewares no Express: composição de rotas, cadeia de middlewares, tipagem com TypeScript e controle básico de autorização em uma API HTTP.

## Tecnologias

- Node.js
- Express 5
- TypeScript
- tsx (execução TypeScript em modo de desenvolvimento)

As dependências e scripts disponíveis estão definidos no `package.json`.

## Funcionalidades

A API atualmente permite:

- Listar comentários de um post
- Criar comentários
- Excluir comentários
- Verificar se o post existe antes de executar a operação
- Identificar o usuário através do header `x-user-id`
- Validar o conteúdo dos comentários
- Verificar se o usuário é proprietário do comentário antes da exclusão

A aplicação registra os dados em memória, sem banco de dados, utilizando arrays para posts e comentários. Ou seja, os dados são perdidos a cada reinicialização do servidor.

## Estrutura

```
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

A aplicação monta as rotas de comentários em `/posts/:postId/comments`.

## Como executar

Clone o repositório e instale as dependências:

```
git clone https://github.com/GustavoGuerato/comment-tree.git
cd comment-tree
npm install
```

Inicie o servidor em modo de desenvolvimento:

```
npm run dev
```

O servidor será iniciado na porta `3000`.

## Endpoints

### GET `/posts/:postId/comments`

Retorna todos os comentários associados ao post informado.

Exemplo:

```
GET /posts/1/comments
```

Resposta:

```
[]
```

O `postId` precisa corresponder a um post existente. Caso contrário, a API retorna `404`.

### POST `/posts/:postId/comments`

Cria um novo comentário.

É necessário enviar o header `x-user-id` para identificar o usuário:

```
POST /posts/1/comments
Content-Type: application/json
x-user-id: user-123
```

Body:

```
{
  "text": "Meu primeiro comentário"
}
```

Resposta esperada:

```
{
  "id": "uuid",
  "postId": "1",
  "userId": "user-123",
  "text": "Meu primeiro comentário"
}
```

O campo `text` deve ser uma string com entre 1 e 280 caracteres. Se o post não existir, a API retorna `404`.

### DELETE `/posts/:postId/comments/:commentId`

Remove um comentário.

É necessário enviar o `x-user-id` correspondente ao proprietário do comentário:

```
DELETE /posts/1/comments/{commentId}
x-user-id: user-123
```

A API verifica se o comentário existe e se pertence ao usuário identificado antes de removê-lo. Se o usuário não for o proprietário, retorna `403`. Em caso de sucesso, retorna `204 No Content`.

## Middleware

O projeto utiliza uma cadeia de middlewares para separar responsabilidades:

- `checkPostExists` verifica a existência do post antes de continuar a requisição.
- `identifyUser` obtém o usuário através do header `x-user-id` e adiciona `userId` ao objeto `request`.
- `validateCommentBody` valida o campo `text` recebido no body da requisição.
- `checkCommentOwnership` garante que somente o usuário proprietário possa excluir o comentário.

## Tipagem

Os principais modelos da aplicação são definidos em TypeScript:

```
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

Também existe uma extensão de `Request` chamada `UserRequest`, utilizada para representar requisições que podem conter o `userId`.

## Status

Projeto de estudo, sem pretensão de uso em produção. Foi feito principalmente para praticar roteamento e middlewares no Express.

## Licença

Este projeto está atualmente publicado sem uma licença especificada no repositório.
