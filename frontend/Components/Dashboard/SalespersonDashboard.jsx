/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import { sales_target_data, top_client_data } from 'mockData';
import axios from 'axios';
import $t from 'mage/translate';
import _ from "underscore";
import pageNames from 'pageNames';
import SalesBar from 'SalesBar';
import CustomersRenderer from 'CustomersRenderer';
import DraftOrdersRenderer from 'DraftOrdersRenderer';
import OrdersRenderer from 'OrdersRenderer';

let { SALESPERSON_DASHBOARD_PAGE } = pageNames;

class SalespersonDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                sales_target: sales_target_data,
                top_client: top_client_data
            },
            draftOrders: {
                sourceData: [],
                isFetching: false,
                isFetchedSuccess: false,
                isFetchedError: false
            },
            customers: {
                sourceData: [],
                isFetching: false,
                isFetchedSuccess: false,
                isFetchedError: false
            }
        };
    }

    componentDidMount = () => {
        this.fetchCustomers();
        this.fetchDraftOrders();
    };

    fetchCustomers = async () => {
        this.setState({
            customers: {
                isFetching: true
            }
        });

        try {
            let response = await axios({
                method: 'GET',
                url: this.props.salespersonCustomersUrl,
                params: {
                    form_key: this.props.formKey,
                    salesperson_id: this.props.salespersonId,
                    get_address: true,
                    get_orders: true
                }
            });

            if (response.data && _.isArray(response.data)) {
                this.setState({
                    customers: {
                        sourceData: response.data,
                        isFetching: false,
                        isFetchedSuccess: true,
                        isFetchedError: false
                    }
                });
            }
        } catch (error) {
            this.setState({
                customers: {
                    sourceData: [],
                    isFetching: false,
                    isFetchedSuccess: false,
                    isFetchedError: true
                }
            });
            console.error(error);
        }
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
                    id: this.props.salespersonId
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
                displayAction={displayAction}
                actionLabel={actionLabel}
                targets={figure.targets}
                displayTargetLabel={key === 0}
                maxSales={figure.max_sales}
                currentSales={figure.current_sales}
                dashboardUrl={this.props.customerDashboardUrl}
                clientId={figure.id}
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
                <section className="update-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Updates')}</h2>
                    </div>
                    <div className="dashboard-update-content" dangerouslySetInnerHTML={{ __html: this.props.updateContent || $t('No update available') }}  />
                </section>

                <CustomersRenderer
                    sourceData={this.state.customers.sourceData}
                    isFetching={this.state.customers.isFetching}
                    isFetchedSuccess={this.state.customers.isFetchedSuccess}
                    isFetchedError={this.state.customers.isFetchedError}
                    customerDashboardUrl={this.props.customerDashboardUrl}
                />

                <DraftOrdersRenderer
                    sourceData={this.state.draftOrders.sourceData}
                    isFetching={this.state.draftOrders.isFetching}
                    isFetchedSuccess={this.state.draftOrders.isFetchedSuccess}
                    isFetchedError={this.state.draftOrders.isFetchedError}
                    baseUrl={this.props.baseUrl}
                    isCopyOrderPage={this.props.isCopyOrderPage}
                    draftOrderResumeUrl={this.props.draftOrderResumeUrl}
                    currentPageName={SALESPERSON_DASHBOARD_PAGE}
                />

                <OrdersRenderer
                    sourceData={this.state.customers.sourceData}
                    isFetching={this.state.customers.isFetching}
                    isFetchedSuccess={this.state.customers.isFetchedSuccess}
                    isFetchedError={this.state.customers.isFetchedError}
                    orderViewUrl={this.props.orderViewUrl}
                    currentPageName={SALESPERSON_DASHBOARD_PAGE}
                />

                {/*<section className="notification-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Notification')}</h2>
                    </div>
                    <div className="placeholder-block" />
                </section>

                <section className="sales-data-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Sales target and sales data')}</h2>
                    </div>
                    <div className="sales-data-container">
                        {this.renderSalesData(
                            this.state.data.sales_target,
                            false
                        )}
                    </div>
                    <div className="action-container">
                        <a className="action secondary dashboard" href={this.props.createNewOrderUrl}>
                            <span>{$t('Create new order')}</span>
                        </a>
                    </div>
                </section>

                <section className="top-client-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Top Clients')}</h2>
                    </div>
                    <div className="sales-data-container">
                        {this.renderSalesData(
                            this.state.data.top_client,
                            true,
                            $t('View Client')
                        )}
                    </div>
                    <button className="action secondary dashboard">
                        <span>{$t('View all clients')}</span>
                    </button>
                </section>*/}
            </div>
        );
    }
}

export default SalespersonDashboard;
