const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    quantity: Int!
    price: Float!
  }

  type User {
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, quantity: Int!, price: Float!): Product
    updateProduct(id: ID!, name: String, quantity: Int, price: Float): Product
    deleteProduct(id: ID!): Boolean
    entryStock(id: ID!, amount: Int!): Product
    outputStock(id: ID!, amount: Int!): Product
    login(username: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
