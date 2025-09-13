
# API Controle de Estoque

## Descrição
API REST para controle de estoque simples, desenvolvida com Node.js e Express. Possui autenticação para movimentações de estoque, CRUD de produtos, regras de negócio e documentação via Swagger.

## Estrutura de Diretórios
- `controller/` - Lógica dos endpoints
- `service/` - Regras de negócio
- `model/` - Modelos de dados
- `repository/` - Persistência em memória
- `middleware/` - Autenticação JWT
- `test/` - Testes automatizados (Supertest)
    - `fixtures/` - Usuários de teste
    - `rest/controller/` - Testes dos endpoints
    - `external/` - Integrações externas
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
