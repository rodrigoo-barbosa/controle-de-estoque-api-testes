
# API Controle de Estoque

## Descrição
API REST e GraphQL para controle de estoque simples, desenvolvida com Node.js, Express e ApolloServer. Possui autenticação para movimentações de estoque, CRUD de produtos, regras de negócio, documentação via Swagger e interface GraphQL.

## Estrutura de Diretórios
- `controller/` - Lógica dos endpoints
- `service/` - Regras de negócio
- `model/` - Modelos de dados
- `repository/` - Persistência em memória
- `middleware/` - Autenticação JWTnpx mocha test/rest/controller/
- `test/` - Testes automatizados (Supertest)
    - `fixtures/` - Usuários de teste
    - `rest/controller/` - Testes dos endpoints
    - `rest/external/` - Integrações externas
- `app.js` - Configuração da aplicação Express
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação Swagger

## Instalação
1. Instale as dependências:
   ```powershell
   npm install
   ```
2. Inicie o servidor:
   ```powershell
   node server.js
   ```

## API GraphQL
1. Instale as dependências necessárias para GraphQL:
    ```powershell
    npm install apollo-server-express graphql jsonwebtoken dotenv
    ```
2. Inicie o servidor GraphQL:
    ```powershell
    node graphql/server.js
   API REST e GraphQL para controle de estoque simples, desenvolvida com Node.js, Express e ApolloServer. Possui autenticação JWT para movimentações de estoque, CRUD de produtos, regras de negócio, documentação via Swagger e interface GraphQL.

### Playground
Acesse o playground em: [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Exemplos de Queries
```graphql
query {
   products {
      id
      name
      quantity
      price
   1. Instale as dependências necessárias para GraphQL:
      ```powershell
      npm install apollo-server-express graphql jsonwebtoken dotenv
      ```
   2. Inicie o servidor GraphQL:
      ```powershell
      node graphql/server.js
      ```
   }
}
```

### Exemplos de Mutations protegidas (JWT)
```graphql
mutation {
   login(username: "rodrigo.barbosa", password: "1q2w3e4r") {
      token
   }
}
```
Use o token retornado no header `Authorization: Bearer <token>` para as mutations:
```graphql
mutation {
   createProduct(name: "Novo Produto", quantity: 10, price: 99.99) {
      id
      name
   }
}
```

### Estrutura GraphQL
- `graphql/app.js` - Configuração ApolloServer e Express
- `graphql/server.js` - Inicialização do servidor
- `graphql/schema.js` - Types, Queries, Mutations
- `graphql/resolvers.js` - Implementação das resolvers
- `graphql/auth.js` - Middleware JWT
- `graphql/userFixture.js` - Usuários para autenticação

## Endpoints
- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Busca produto por ID
- `POST /products` - Cria novo produto
- `PUT /products/:id` - Atualiza produto
- `DELETE /products/:id` - Remove produto
- `POST /products/:id/entry` - Entrada de estoque (requer autenticação)
- `POST /products/:id/output` - Saída de estoque (requer autenticação)
- `POST /login` - Autenticação de usuário
- `GET /api-docs` - Documentação Swagger

## Autenticação
Para criar, atualizar, excluir produtos, dar entrada ou saída de estoque, é necessário autenticação via JWT.


   Testes para a API GraphQL estão em `test/rest/external/product-externalGraphQL.test.js`.

   Para rodar os testes REST:
   ```powershell
   npx mocha test/rest/controller/
   ```
   Para rodar os testes GraphQL:
   ```powershell
   npx mocha test/rest/external/product-externalGraphQL.test.js
   ```
### Usuários cadastrados (fixtures):
- username: `rodrigo.barbosa`, password: `1q2w3e4r`
- username: `rodrigo.silva`, password: `123456789`

### Como obter o token:
Faça uma requisição POST para `/login`:
```json
POST /login
{
   "username": "rodrigo.barbosa",
   "password": "1q2w3e4r"
}
```
Se as credenciais estiverem corretas, será retornado:
```json
{
   "token": "<seu_token_jwt>"
}
```
Use este token no header das rotas protegidas:
```
Authorization: Bearer <seu_token_jwt>
```

### Regras de autorização
Somente usuários cadastrados podem realizar operações protegidas. Usuário não encontrado recebe erro 403 (Usuário não autorizado).

## Regras de Negócio
- Não permite saída maior que o estoque disponível.
- Movimentações sem autenticação retornam erro 401.

## Testes Automatizados
Os testes estão localizados em `test/rest/controller/product-controller.test.js` e utilizam Supertest para validação dos endpoints, incluindo cenários de autenticação, movimentação inválida e usuários não autorizados.

Para rodar os testes:
```powershell
npm test
```

## Observações
- Persistência em memória (array)
- Para testes automatizados, importe `app.js` no Supertest.
