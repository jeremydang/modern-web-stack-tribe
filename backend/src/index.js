import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import schema from './graphql/schema';
import models from './models';

const options = {
  port: process.env.PORT || '4000',
  endpoint: '/graphql',
};

const app = express();

app.use(
  options.endpoint,
  bodyParser.json(),
  graphqlHTTP({
    schema,
    context: {
      models,
    },
    graphiql: true,
  })
);

app.listen(options.port, () => console.log(`Browse to localhost:${options.port}/graphql`));
