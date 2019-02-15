/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React from 'react';
import $t from 'mage/translate';
import CustomerUtils from 'CustomerUtils';

const CustomerRow = props => {
    return (
        <li className="customer-row-container">
            <a className="customer-row" href={`${props.customerDashboardUrl}?customer_id=${props.id}`}>
                <div className="customer-id">{
                    CustomerUtils.isLfgIdExist(props) ? props.lfg_customer_id : $t('N/A')
                }</div>
                <div className="customer-name">{
                    CustomerUtils.isNameExist(props) ? props.name : $t('N/A')
                }</div>
                <div className="customer-street-address">{
                    CustomerUtils.isStreetExist(props) ? (
                        props.addresses[0].streets[0]
                    ) : $t('N/A')
                }</div>
                <div className="customer-city">{
                    CustomerUtils.isCityExist(props) ? (
                        props.addresses[0].city
                    ) : $t('N/A')
                }</div>
                <div className="customer-country">{
                    CustomerUtils.isCountryExist(props) ? (
                        props.addresses[0].country
                    ) : $t('N/A')
                }</div>
            </a>
        </li>
    );
};

export default CustomerRow;
