/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomerRow.module.css';

const CustomerRow = ({ customerId, firstname, lastname, age, lfgCustomerId }) => {
  return (
    <li>
      <a className={styles.rowContainer} href={''}>
        <div className={`customer-id ${styles.rowValue}`}>{customerId || 'N/A'}</div>
        <div className={`customer-firstname ${styles.rowValue}`}>{firstname || 'N/A'}</div>
        <div className={`customer-lastname ${styles.rowValue}`}>{lastname || 'N/A'}</div>
        <div className={`customer-age ${styles.rowValue}`}>{age || 'N/A'}</div>
        <div className={`customer-country ${styles.rowValue}`}>{lfgCustomerId || 'N/A'}</div>
      </a>
    </li>
  );
};

export default CustomerRow;

CustomerRow.propTypes = {
  age: PropTypes.number,
  customerId: PropTypes.number,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  lfgCustomerId: PropTypes.number,
};
