/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import _ from 'underscore';
import OrderRow from './OrderRow';
import SearchInput from '../SearchInput/SearchInput';
import styles from './OrderRenderer.module.css';

class OrdersRenderer extends Component {
  renderOrders = () => {
    let orders = this.props.orders;

    if (!_.isEmpty(orders)) {
      return orders.map(order => <OrderRow key={order.id} {...order} />);
    }
  };

  debouncedOnInputChange = async keyword => {};

  onInputChange = event => {
    this.debouncedOnInputChange(event.target.value);
  };

  render() {
    return (
      <section className="orders-section dashboard-section">
        <div className={styles.sectionTitle}>
          <h2>Orders</h2>
        </div>
        <SearchInput
          onInputChange={this.onInputChange}
        />
        <div className={styles.headerContainer}>
          <div className={`order-id ${styles.headerTitle}`}>Nr.</div>
          <div className={`order-name ${styles.headerTitle}`}>Order name</div>`
          <div className={`order-type ${styles.headerTitle}`}>Order Type</div>
          <div className={`order-grand-total ${styles.headerTitle}`}>Grand Total</div>
          <div className={`order-srp-total ${styles.headerTitle}`}>SRP Total</div>
        </div>
        <ul className={styles.tableRowContainer}>{this.renderOrders()}</ul>
      </section>
    );
  }
}

export default OrdersRenderer;
