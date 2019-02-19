import { MockList } from 'apollo-server';
import casual from 'casual';
import uuidv4 from 'uuid/v4';

export default {
  Client: () => ({
    id: uuidv4(),
    customerId: casual.integer(0),
    firstname: casual.first_name,
    lastname: casual.last_name,
    age: casual.integer(20, 60),
    orders: () => new MockList([3, 6]),
  }),
  Order: () => ({
    id: uuidv4(),
    orderId: casual.integer(1000),
    orderName: casual.title,
    orderType: 'Pre-order',
    grandTotal: casual.double(200),
    srpTotal: casual.double(600),
    customerId: casual.integer(0),
    currency: casual.currency_code,
  }),
  Query: () => ({
    clients: () => new MockList([6, 12]),
    orders: () => new MockList([6, 12]),
  }),
};
