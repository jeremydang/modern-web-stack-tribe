import { gql } from 'apollo-server-express';
import Client from './Client/';
import Order from './Order/';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;
const typeDefs = [linkSchema, Client, Order];

export default typeDefs;
