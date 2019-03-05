/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import PropTypes from 'prop-types'
import React from 'react';
import styles from './OrderRow.module.css';

const OrderRow = ({ orderId, orderName, orderType, grandTotal, srpTotal }) => {
  return (
    <li>
      <a className={styles.rowContainer} href={''}>
        <div className={`order-id ${styles.rowValue}`}>{orderId || 'N/A'}</div>
        <div className={`order-name ${styles.rowValue}`}>{orderName || 'N/A'}</div>
        <div className={`order-type ${styles.rowValue}`}>{orderType || 'N/A'}</div>
        <div className={`grand-total ${styles.rowValue}`}>{grandTotal || 'N/A'}</div>
        <div className={`srp-total ${styles.rowValue}`}>{srpTotal || 'N/A'}</div>
      </a>
    </li>
  );
};

export default OrderRow;

OrderRow.propTypes = {
  grandTotal: PropTypes.number,
  orderId: PropTypes.number,
  orderName: PropTypes.string,
  orderType: PropTypes.string,
  srpTotal: PropTypes.number
};