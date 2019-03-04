/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import { forecast_data } from 'mockData';
import axios from 'axios';
import $t from 'mage/translate';
import _ from "underscore";
import pageNames from 'pageNames';
import SalesBar from 'SalesBar';
import AddressBlock from 'AddressBlock';
import DraftOrdersRenderer from 'DraftOrdersRenderer';
import OrdersRenderer from 'OrdersRenderer';

let { CUSTOMER_DASHBOARD_PAGE } = pageNames;

class CustomerDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                forecast: forecast_data
            },
            draftOrders: {
                sourceData: [],
                isFetching: false,
                isFetchedSuccess: false,
                isFetchedError: false
            },
            orders: {
                sourceData: this.props.customerOrders,
                isFetching: false,
                isFetchedSuccess: true,
                isFetchedError: false
            }
        };
    }

    componentDidMount = () => {
        this.fetchDraftOrders();
    };

    fetchDraftOrders = async () => {
        this.setState({
            draftOrders: {
                isFetching: true
            }
        });

        try {
            let response = await axios({
                method: 'GET',
                url: this.props.draftOrderUrl,
                params: {
                    id: this.props.customerId
                }
            });

            if (response.data && _.isArray(response.data)) {
                this.setState({
                    draftOrders: {
                        sourceData: response.data,
                        isFetching: false,
                        isFetchedSuccess: true,
                        isFetchedError: false
                    }
                });
            }
        } catch (error) {
            this.setState({
                draftOrders: {
                    sourceData: [],
                    isFetching: false,
                    isFetchedSuccess: false,
                    isFetchedError: true
                }
            });
            console.error(error);
        }
    };

    renderSalesData = (data, displayAction, actionLabel) => {
        return data.map((figure, key) => (
            <SalesBar
                key={key}
                barTitle={figure.label}
                displayAction={key === 0 ? false : displayAction}
                actionLabel={actionLabel}
                targets={figure.targets}
                displayTargetLabel={key === 0}
                maxSales={figure.max_sales}
                currentSales={figure.current_sales}
            />
        ));
    };

    render() {
        if (!this.state.data) {
            return (
                <div className="dashboard-container-popup loading">
                    <div data-role="loader" className="loading-mask">
                        <div className="loader">
                            <img
                                src={this.props.loaderImage}
                                alt="Loading..."
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="content">
                <section className="sales-data-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Client Contact')}</h2>
                    </div>
                    <div>
                        <div className="company-address-wrapper">
                            {this.props.customerAddresses && this.props.customerAddresses.length > 0 ? (
                                <AddressBlock address={this.props.customerAddresses[0]} />
                            ) : (
                                <div>
                                    <span>{$t('No address found.')}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="action-container">
                        <a className="action secondary dashboard" href={this.props.createNewOrderUrl}>
                            <span>{$t('Create new order')}</span>
                        </a>
                    </div>
                </section>

                <DraftOrdersRenderer
                    sourceData={this.state.draftOrders.sourceData}
                    isFetching={this.state.draftOrders.isFetching}
                    isFetchedSuccess={this.state.draftOrders.isFetchedSuccess}
                    isFetchedError={this.state.draftOrders.isFetchedError}
                    baseUrl={this.props.baseUrl}
                    isCopyOrderPage={this.props.isCopyOrderPage}
                    draftOrderResumeUrl={this.props.draftOrderResumeUrl}
                    currentPageName={CUSTOMER_DASHBOARD_PAGE}
                />

                <OrdersRenderer
                    sourceData={this.state.orders.sourceData}
                    isFetching={this.state.orders.isFetching}
                    isFetchedSuccess={this.state.orders.isFetchedSuccess}
                    isFetchedError={this.state.orders.isFetchedError}
                    orderViewUrl={this.props.orderViewUrl}
                    currentPageName={CUSTOMER_DASHBOARD_PAGE}
                />

                {/*<section className="campaign-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Campaign')}</h2>
                    </div>
                    <div className="placeholder-block" />
                </section>

                <section className="top-client-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Forecast and sales data')}</h2>
                    </div>
                    <div className="sales-data-container">
                        {this.renderSalesData(
                            this.state.data.forecast,
                            true,
                            $t('Detailed forecast')
                        )}
                    </div>
                </section>*/}
            </div>
        );
    }
}

export default CustomerDashboard;
