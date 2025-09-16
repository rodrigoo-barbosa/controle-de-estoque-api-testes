const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authenticate } = require('./auth');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startApollo();

module.exports = app;
