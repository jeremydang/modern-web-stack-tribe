import _ from 'lodash';
import uuidv4 from 'uuid/v4';

export default {
  Query: {
    clients: (parent, args, { models }) => {
      return models.clients;
    },
    client: (parent, { id }, { models }) => {
      return _.find(models.clients, { id: id });
    },
  },
  Mutation: {
    createClient: (parent, { client }, { models }) => {
      const createdClient = {
        ...client,
        id: uuidv4(),
        customerId: ++models.clients.length,
      };
      models.clients.push(createdClient);
      return createdClient;
    },
    updateClient: (parent, { id, client }, { models }) => {
      models.clients = _.map(models.clients, currentClient => {
        return currentClient.id === id ? { ...currentClient, ...client } : currentClient;
      });
      return _.find(models.clients, { id: id });
    },
    deleteClient: (parent, { id }, { models }) => {
      let clientToDelete = _.remove(models.clients, { id: id });
      return clientToDelete[0];
    },
  },
  Client: {
    orders: (client, args, { models }) => {
      return _.filter(models.orders, { customerId: client.customerId });
    },
  },
};
