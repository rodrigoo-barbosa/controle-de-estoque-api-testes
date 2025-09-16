const request = require('supertest')
const { expect } = require('chai')

describe('Testes de Controller External de Produtos via GraphQL', () => {
    let token;

    before(async () => {
        const loginMutation = ` mutation {
                login(username: "rodrigo.barbosa", password: "1q2w3e4r") {
                    token
                }
            }
        `
        const respostaLogin = await request('http://localhost:4000')
            .post('/graphql')
            .send({ query: loginMutation })
        expect(respostaLogin.status).to.equal(200)
        
    })

    it('Quando consulta todos os produtos, retorna lista de produtos', async () => {
        const query = `
            query {
                products { id
                    name
                    quantity
                    price
                }
            }
        `
        const resposta = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({ query })
        })
})