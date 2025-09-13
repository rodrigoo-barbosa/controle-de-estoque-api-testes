const express = require('express')
const productController = require('./controller/productController')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const authMiddleware = require('./middleware/authMiddleware')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const users = require('./test/fixtures/userFixture')
const SECRET = 'seu_segredo_super_secreto'

// Rota de login
app.post('/login', (req, res) => {
	const { username, password } = req.body
	const user = users.find(u => u.username === username && u.password === password)
	if (user) {
		const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })
		return res.json({ token })
	}
	return res.status(401).json({ message: 'Credenciais inválidas' })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Rotas públicas (sem autenticação)
app.get('/products', productController.getAll)
app.get('/products/:id', productController.getById)

// Rotas protegidas (com autenticação)
app.use('/products', require('./middleware/authMiddleware')(users))
app.post('/products', productController.create)
app.put('/products/:id', productController.update)
app.delete('/products/:id', productController.delete)
app.post('/products/:id/entry', productController.entry)
app.post('/products/:id/output', productController.output)

module.exports = app
