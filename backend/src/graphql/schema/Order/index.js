import { gql } from 'apollo-server-express';

export default gql`
  type Order {
    id: ID!
    orderId: Int!
    orderName: String!
    orderType: String!
    grandTotal: Float!
    srpTotal: Float!
    currency: String!
    customerId: Int!
  }

  extend type Query {
    order(id: ID!): Order!
    orders: [Order!]!
  }

  extend type Mutation {
    deleteOrder(id: ID!): Order!
  }
`;
