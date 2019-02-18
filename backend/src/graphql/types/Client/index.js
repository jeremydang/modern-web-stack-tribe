export default `
  type Client {
    id: ID!
    customerId: Int!
    firstname: String!
    lastname: String!
    age: Int
    lfgCustomerId: Int
    orders: [Order!]!
  }
  type Query {
    client(id: ID!): Client
    clients: [Client!]!
  }
  type Mutation {
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