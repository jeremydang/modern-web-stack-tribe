export default `
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
  type Query {
    order(id: ID!): Order!
    orders: [Order!]!
  }
  type Mutation {
    deleteOrder(id: ID!): Order!
  }
`;
