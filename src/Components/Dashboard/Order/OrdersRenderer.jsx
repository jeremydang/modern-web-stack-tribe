/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import $t from 'mage/translate';
import _ from 'underscore';
import pageNames from 'pageNames';
import TableLoader from 'TableLoader';
import OrderRow from 'OrderRow';
import OrderUtils from 'OrderUtils';
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from 'staticVariables';

let { SALESPERSON_DASHBOARD_PAGE } = pageNames;

class OrdersRenderer extends Component {
    constructor(props) {
        super(props);

        let filteredSortedOrders =
            this.props.currentPageName === SALESPERSON_DASHBOARD_PAGE
                ? this.filterAndSortOrders(this.props.sourceData)
                : this.props.sourceData;

        this.state = {
            sourceData: filteredSortedOrders || [],
            renderData: filteredSortedOrders || [],
            isFetching: this.props.isFetching || false,
            isFetchedSuccess: this.props.isFetchedSuccess || false,
            isFetchedError: this.props.isFetchedError || false,
            sortOrder: {
                increment_id: SORT_ORDER_ASC,
                lfg_customer_id: SORT_ORDER_ASC,
                customer_id: SORT_ORDER_ASC,
                customer_name: SORT_ORDER_ASC,
                order_type_label: SORT_ORDER_ASC,
                created_at: SORT_ORDER_ASC,
                org_grand_total: SORT_ORDER_ASC,
                org_srp_total: SORT_ORDER_ASC,
            },
        };

        this.debouncedOnInputChange = _.debounce(this.debouncedOnInputChange, 200);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.sourceData !== prevProps.sourceData) {
            let filteredSortedOrders =
                this.props.currentPageName === SALESPERSON_DASHBOARD_PAGE
                    ? this.filterAndSortOrders(this.props.sourceData)
                    : this.props.sourceData;
            this.setState({
                sourceData: filteredSortedOrders,
                renderData: filteredSortedOrders,
                isFetching: this.props.isFetching,
                isFetchedSuccess: this.props.isFetchedSuccess,
                isFetchedError: this.props.isFetchedError,
            });
        }
    }

    filterAndSortOrders = sourceData => {
        if (!_.isEmpty(sourceData)) {
            let filteredOrders = sourceData.reduce(function(filtered, customer) {
                if (!_.isEmpty(customer.orders)) {
                    filtered.push(customer.orders);
                }
                return filtered;
            }, []);

            if (!_.isEmpty(filteredOrders)) {
                filteredOrders = _.uniq([].concat(...filteredOrders));
                return filteredOrders.sort(OrderUtils.sortOrderCreationdDate);
            }
        }
    };

    renderCustomersOrdersData = () => {
        let orders = this.state.renderData;

        if (!_.isEmpty(orders)) {
            return orders.map((customerOrder, key) => (
                <OrderRow
                    {...this.props}
                    key={key}
                    orderId={customerOrder.id}
                    orderIncrementId={customerOrder.increment_id}
                    customerLfgId={customerOrder.lfg_customer_id}
                    customerName={customerOrder.customer_name}
                    orderType={customerOrder.order_type}
                    creationDate={customerOrder.created_at}
                    grandTotal={customerOrder.grand_total}
                    srpTotal={customerOrder.srp_total}
                />
            ));
        }
    };

    debouncedOnInputChange = async keyword => {
        let formattedKeyword = keyword.toLowerCase().trim();
        let filteredOrders = this.state.sourceData.filter(
            order =>
                (OrderUtils.isOrderIdExist(order) &&
                    `${order.increment_id}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isOrderCustomerLfgIdExist(order) &&
                    `${order.lfg_customer_id}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isOrderCustomerNameExist(order) &&
                    `${order.customer_name}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isOrderTypeExist(order) &&
                    `${order.order_type}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isCreationDateExist(order) &&
                    `${order.created_at}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isGrandTotalExist(order) &&
                    `${order.grand_total}`.toLowerCase().includes(formattedKeyword)) ||
                (OrderUtils.isSrpTotalExist(order) &&
                    `${order.srp_total}`.toLowerCase().includes(formattedKeyword))
        );

        this.setState({
            renderData: filteredOrders,
        });
    };

    onInputChange = event => {
        this.debouncedOnInputChange(event.target.value);
    };

    sortData = dataToSort => {
        let renderData = this.state.renderData,
            sortDirection = this.state.sortOrder[dataToSort];

        if (sortDirection === SORT_ORDER_ASC) {
            if (dataToSort === 'org_grand_total' || dataToSort === 'org_srp_total') {
                renderData.sort((prev, next) => {
                    return +prev[dataToSort] > +next[dataToSort] ? -1 : 1;
                });
            } else {
                renderData.sort((prev, next) => {
                    return prev[dataToSort] > next[dataToSort] ? -1 : 1;
                });
            }

            this.setState({ sortOrder: { [dataToSort]: SORT_ORDER_DESC } });
        } else {
            if (dataToSort === 'org_grand_total' || dataToSort === 'org_srp_total') {
                renderData.sort((prev, next) => {
                    return +prev[dataToSort] < +next[dataToSort] ? -1 : 1;
                });
            } else {
                renderData.sort((prev, next) => {
                    return prev[dataToSort] < next[dataToSort] ? -1 : 1;
                });
            }

            this.setState({ sortOrder: { [dataToSort]: SORT_ORDER_ASC } });
        }

        this.setState({ renderData: renderData });
    };

    render() {
        let { renderData, isFetching, isFetchedSuccess, isFetchedError } = this.state;

        return (
            <section className="orders-section dashboard-section">
                <div className="section-title">
                    <h2>{$t('Orders')}</h2>
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
                <div className="orders-header">
                    <div
                        className={`id sort-direction-${this.state.sortOrder.increment_id}`}
                        onClick={() => {
                            this.sortData('increment_id');
                        }}
                    >
                        {$t('Nr.')}
                    </div>
                    {this.props.currentPageName === SALESPERSON_DASHBOARD_PAGE && (
                        <React.Fragment>
                            <div
                                className={`customer-lfg-id sort-direction-${
                                    this.state.sortOrder.lfg_customer_id
                                }`}
                                onClick={() => {
                                    this.sortData('lfg_customer_id');
                                }}
                            >
                                {$t('Customer Nr.')}
                            </div>
                            <div
                                className={`customer-name sort-direction-${
                                    this.state.sortOrder.customer_name
                                }`}
                                onClick={() => {
                                    this.sortData('customer_name');
                                }}
                            >
                                {$t('Customer Name')}
                            </div>
                        </React.Fragment>
                    )}
                    <div
                        className={`order-type sort-direction-${
                            this.state.sortOrder.order_type_label
                        }`}
                        onClick={() => {
                            this.sortData('order_type_label');
                        }}
                    >
                        {$t('Order type')}
                    </div>
                    <div
                        className={`creation-date sort-direction-${
                            this.state.sortOrder.created_at
                        }`}
                        onClick={() => {
                            this.sortData('created_at');
                        }}
                    >
                        {$t('Creation date')}
                    </div>
                    <div
                        className={`grand-total sort-direction-${
                            this.state.sortOrder.org_grand_total
                        }`}
                        onClick={() => {
                            this.sortData('org_grand_total');
                        }}
                    >
                        {$t('Grand total')}
                    </div>
                    <div
                        className={`srp-total sort-direction-${this.state.sortOrder.org_srp_total}`}
                        onClick={() => {
                            this.sortData('org_srp_total');
                        }}
                    >
                        {$t('Srp total')}
                    </div>
                    <div className="view-order">{$t('View order')}</div>
                </div>
                {renderData && _.isArray(renderData) && renderData.length > 0 ? (
                    <div className="orders-container">{this.renderCustomersOrdersData()}</div>
                ) : isFetching ? (
                    <TableLoader numberOfRow={8} />
                ) : isFetchedError ? (
                    <div>{$t('Something goes wrong while fetching orders.')}</div>
                ) : (
                    <div>{$t('No available order.')}</div>
                )}
            </section>
        );
    }
}

export default OrdersRenderer;
