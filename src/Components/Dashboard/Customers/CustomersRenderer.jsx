/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import $t from 'mage/translate';
import _ from 'underscore';
import TableLoader from 'TableLoader';
import CustomerRow from 'CustomerRow';
import CustomerUtils from 'CustomerUtils';

class CustomersRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sourceData: [],
            renderData: [],
            isFetching: false,
            isFetchedSuccess: false,
            isFetchedError: false
        };

        this.debouncedOnInputChange = _.debounce(this.debouncedOnInputChange, 200);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.sourceData !== prevProps.sourceData) {
            this.setState({
                sourceData: this.props.sourceData,
                renderData: this.props.sourceData,
                isFetching: this.props.isFetching,
                isFetchedSuccess: this.props.isFetchedSuccess,
                isFetchedError: this.props.isFetchedError
            });
        }
    };

    renderCustomers = () => {
        let customers = this.state.renderData;

        if (customers && _.isArray(customers) && customers.length > 0) {
            return customers.map((customer, key) => (
                <CustomerRow
                    key={key}
                    customerDashboardUrl={this.props.customerDashboardUrl}
                    id={customer.id}
                    lfg_customer_id={customer.lfg_customer_id}
                    name={customer.name}
                    addresses={customer.addresses}
                />
            ));
        }
    };

    debouncedOnInputChange = async (keyword) => {
        let formattedKeyword = keyword.toLowerCase().trim();
        let filteredCustomers = this.state.sourceData.filter(customer =>
            CustomerUtils.isNameExist(customer) && `${customer.name}`.toLowerCase().includes(formattedKeyword) ||
            CustomerUtils.isLfgIdExist(customer) && `${customer.lfg_customer_id}`.toLowerCase().includes(formattedKeyword) ||
            CustomerUtils.isStreetExist(customer) && `${customer.addresses[0].streets[0]}`.toLowerCase().includes(formattedKeyword) ||
            CustomerUtils.isCityExist(customer) && `${customer.addresses[0].city}`.toLowerCase().includes(formattedKeyword) ||
            CustomerUtils.isCountryExist(customer) && `${customer.addresses[0].country}`.toLowerCase().includes(formattedKeyword)
        );

        this.setState({
            renderData: filteredCustomers
        });
    };

    onInputChange = (event) => {
        this.debouncedOnInputChange(event.target.value);
    };

    render() {
        let { renderData, isFetching, isFetchedSuccess, isFetchedError } = this.state;

        return (
            <section className="customers-section dashboard-section">
                <div className="section-title">
                    <h2>{$t('Clients')}</h2>
                </div>
                <div className="section-search-box-wrapper">
                    <input
                        className="search-input"
                        type="text"
                        placeholder={$t('Search')}
                        onChange={this.onInputChange}
                        disabled={!isFetchedSuccess}
                    />
                    <span className="search-icon" title={$t('Search customers icon')}>
                        {$t('Search customers icon')}
                    </span>
                </div>
                <div className="customers-header">
                    <div className="customer-id">{$t('Nr.')}</div>
                    <div className="customer-name">{$t('Name')}</div>
                    <div className="customer-street-address">{$t('Street address')}</div>
                    <div className="customer-city">{$t('City')}</div>
                    <div className="customer-country">{$t('Country')}</div>
                </div>
                {renderData && _.isArray(renderData) && renderData.length > 0 ? (
                    <ul className="customers-container">
                        {this.renderCustomers()}
                    </ul>
                ) : (
                    isFetching ? (
                        <TableLoader numberOfRow={8} />
                    ) : (
                        isFetchedError ? (
                            <div>{$t('Something goes wrong while fetching customers.')}</div>
                        ) : (
                            <div>{$t('No available customers.')}</div>
                        )
                    )
                )}
            </section>
        );
    }
}

export default CustomersRenderer;
