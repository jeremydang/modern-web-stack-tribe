/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import _ from 'underscore';
import CustomerRow from './CustomerRow';
import SearchInput from '../SearchInput/SearchInput';
import styles from './CustomersRenderer.module.css';

class CustomersRenderer extends Component {
  renderCustomers = () => {
    let customers = this.props.customers;

    if (customers && !_.isEmpty(customers)) {
      return customers.map(customer => <CustomerRow key={customer.id} {...customer} />);
    }
  };

  debouncedOnInputChange = async keyword => {};

  onInputChange = event => {
    this.debouncedOnInputChange(event.target.value);
  };

  render() {
    return (
      <section className="customers-section dashboard-section">
        <div className={styles.sectionTitle}>
          <h2>Clients</h2>
        </div>
        <SearchInput onInputChange={this.onInputChange} />
        <div className={styles.headerContainer}>
          <div className={`customer-id ${styles.headerTitle}`}>Nr</div>
          <div className={`customer-firstname ${styles.headerTitle}`}>First name</div>
          <div className={`customer-lastname ${styles.headerTitle}`}>Last Name</div>
          <div className={`customer-age ${styles.headerTitle}`}>Age</div>
          <div className={`customer-lfg-id ${styles.headerTitle}`}>LFG CustomerId</div>
        </div>
        <ul className={styles.tableRowContainer}>{this.renderCustomers()}</ul>
      </section>
    );
  }
}

export default CustomersRenderer;
