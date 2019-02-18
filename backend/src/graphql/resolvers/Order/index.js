import _ from "lodash";

export default {
  Query: {
    orders: (parent, arg, { models }) => {
      return models.orders;
    },
    order: (parent, { id }, { models }) => {
      return _.find(models.orders, { id: id });
    }
  },
  Mutation: {
    deleteOrder: (parent, { id }, { models }) => {
      let orderToDelete = _.remove(models.orders, { id: id });
      return orderToDelete[0];
    },
  }
}