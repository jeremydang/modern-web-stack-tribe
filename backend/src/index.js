import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers/';
import models from './models/';

const options = {
  port: process.env.PORT || '4000',
  endpoint: '/graphql',
};

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
  },
  playground: {
    endpoint: `http://localhost:${options.port}${options.endpoint}`,
  },
});

app.use(bodyParser.json());
server.applyMiddleware({ app, path: options.endpoint });

app.listen(options.port, () =>
  console.log(`Browse to localhost:${options.port}${options.endpoint}`)
);