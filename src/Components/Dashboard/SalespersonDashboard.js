/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CustomersRenderer from './Customers/CustomersRenderer';
import OrdersRenderer from './Order/OrdersRenderer';
import TableLoader from '../Loaders/TableLoader';

const ALL_CLIENTS_QUERY = gql`
  {
    clients {
      id,
      customerId,
      firstname,
      lastname,
      lfgCustomerId,
      age
    }
  }
`;

const ALL_ORDERS_QUERY = gql`
  {
    orders {
      id,
      orderId,
      orderName,
      orderType,
      grandTotal,
      srpTotal,
      currency,
    }
  }
`;

class SalespersonDashboard extends Component {
  render() {
    return (
      <div className="content">
        <Query query={ALL_CLIENTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading || !data) {
              return <div><TableLoader numberOfRow={8} /></div>
            }

            if (error) {
              return <div>Fetch data error: {error}</div>
            }

            const customers = data.clients;

            return (
              <CustomersRenderer
                customers={customers}
              />
            )
          }}
        </Query>

        <Query query={ALL_ORDERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading || !data) {
              return <div><TableLoader numberOfRow={8} /></div>
            }

            if (error) {
              return <div>Fetch data error: {error}</div>
            }

            const orders = data.orders;

            return (
              <OrdersRenderer
                orders={orders}
              />
            )
          }}
        </Query>
      </div>
    );
  }
}

export default SalespersonDashboard;
