import { mergeTypes } from 'merge-graphql-schemas';
import Client from './Client/';
import Order from './Order/';

const typeDefs = [Client, Order];

export default mergeTypes(typeDefs, { all: true });
