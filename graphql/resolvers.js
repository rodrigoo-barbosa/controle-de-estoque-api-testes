const productService = require('../service/productService');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./auth');
const users = require('./userFixture');

const resolvers = {
  Query: {
    products: () => productService.getAll(),
    product: (_, { id }) => productService.getById(id),
  },
  Mutation: {
    createProduct: (_, { name, quantity, price }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      // Gera um id simples para o produto
      const id = Date.now().toString();
      return productService.create({ id, name, quantity, price });
    },
    updateProduct: (_, { id, name, quantity, price }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return productService.update(id, { name, quantity, price });
    },
    deleteProduct: (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return productService.delete(id);
    },
    entryStock: (_, { id, amount }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return productService.entry(id, amount);
    },
    outputStock: (_, { id, amount }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return productService.output(id, amount);
    },
    login: (_, { username, password }) => {
      const found = users.find(u => u.username === username && u.password === password);
      if (!found) throw new Error('Invalid credentials');
      const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
      return { token };
    },
  },
};

module.exports = resolvers;
