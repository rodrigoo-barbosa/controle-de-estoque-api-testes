const jwt = require('jsonwebtoken')
const SECRET = 'seu_segredo_super_secreto'

module.exports = (users) => (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, SECRET)
    const user = users.find(u => u.username === decoded.username)
    if (!user) {
      return res.status(403).json({ message: 'Usuário não autorizado' })
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
