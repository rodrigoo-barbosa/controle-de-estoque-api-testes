const request = require('supertest')
const { expect } = require('chai')


describe('Testes de Controller de Produtos sem autenticação NÃO MOCKADO', () => {
    describe('GET /products/:id', () => {
        it('Quando busca por produto por id inexistente, retorna 404 - Produto não encontrado', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/products/500')
            expect(resposta.status).to.equal(404)
        })
    })
})

describe('Testes de Controller de Produtos com autenticação', () => {
    let token

    before(async () => {
            const respostaLogin = await request('http://localhost:3000')
            .post('/login')
            .send({
                username: 'rodrigo.barbosa',
                password: '1q2w3e4r'
            })
        token = respostaLogin.body.token
        expect(respostaLogin.status).to.equal(200)
    })

    it('Quando tenta cadastrar produto com usuário autorizado, retorna 201  - Produto cadastrado com sucesso ', async () => {

        const resposta = await request('http://localhost:3000')
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: '1',
                name: 'Shampoo',
                quantity: 10
            })
        expect(resposta.status).to.equal(201)
    })

    it('Quando tenta cadastrar produto com usuario não autorizado, retorna 401 - Usuário não autorixado', async () => {
        
        const respostaLogin = await request('http://localhost:3000')
            .post('/login')
            .send({
                username: 'usuario.naocadastrado',
                password: '1q2w3e4r'
            })
        expect(respostaLogin.status).to.equal(401)

        
        const resposta = await request('http://localhost:3000')
            .post('/products')
            .set('Authorization', 'Bearer token_invalido')
            .send({
                id: '2',
                name: 'Margarina da Boa',
                quantity: 5
            })
        expect([401]).to.include(resposta.status)
    })
})