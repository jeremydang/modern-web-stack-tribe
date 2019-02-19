import { gql } from 'apollo-server-express';

export default gql`
  type Client {
    id: ID!
    customerId: Int!
    firstname: String!
    lastname: String!
    age: Int
    lfgCustomerId: Int
    orders: [Order!]!
  }
  extend type Query {
    client(id: ID!): Client
    clients: [Client!]!
  }
  extend type Mutation {
    createClient(client: CreateClientInput): Client!
    updateClient(id: ID!, client: UpdateClientInput!): Client
    deleteClient(id: ID!): Client
  }
  input CreateClientInput {
    firstname: String!
    lastname: String!
    lfgCustomerId: Int!
  }
  input UpdateClientInput {
    firstname: String!
    lastname: String!
    lfgCustomerId: Int!
  } 
`;