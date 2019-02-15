/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import $t from 'mage/translate';
import _ from 'underscore';
import pageNames from 'pageNames';
import TableLoader from 'TableLoader';
import DraftOrderRow from 'DraftOrderRow';
import DraftOrderUtils from 'DraftOrderUtils';
import axios from 'axios';
import customerData from 'Magento_Customer/js/customer-data';
import { popupConfigs, openPopup, closePopup } from 'popupUtils';
import ConfirmDeleteDraft from 'ConfirmDeleteDraft';
import { SORT_ORDER_ASC, SORT_ORDER_DESC } from 'staticVariables';

let { SALESPERSON_DASHBOARD_PAGE } = pageNames;

class DraftOrdersRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sourceData: [],
            renderData: [],
            isFetching: false,
            isFetchedSuccess: false,
            isFetchedError: false,
            quoteIdDelete: null,
            deleting: false,
            sortOrder: {
                entity_id: SORT_ORDER_ASC,
                lfg_customer_id: SORT_ORDER_ASC,
                customer_id: SORT_ORDER_ASC,
                customer_firstname: SORT_ORDER_ASC,
                order_type_label: SORT_ORDER_ASC,
                formatted_created_at: SORT_ORDER_ASC,
                formatted_updated_at: SORT_ORDER_ASC,
                grand_total: SORT_ORDER_ASC,
                srp_total: SORT_ORDER_ASC,
            },
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
                isFetchedError: this.props.isFetchedError,
            });
        }
    }

    componentDidMount = () => {
        popupConfigs({
            cancelBtn: '#cancel-delete-draft-button',
            confirmBtn: '#confirm-delete-draft-button',
            popupContainer: '.confirm-delete-draft-container',
            popupConfigs: {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                modalClass: 'confirm-delete-draft-popup',
            },
        });
    };

    renderDraftOrders = () => {
        let draftOrders = this.state.renderData;

        if (draftOrders && _.isArray(draftOrders) && draftOrders.length > 0) {
            return draftOrders.map((draftOrder, key) => (
                <DraftOrderRow
                    {...this.props}
                    key={key}
                    entity_id={draftOrder.entity_id}
                    order_name={draftOrder.order_name}
                    is_preorder={draftOrder.is_preorder}
                    order_type_label={draftOrder.order_type_label}
                    created_at={draftOrder.created_at}
                    formatted_created_at={draftOrder.formatted_created_at}
                    updated_at={draftOrder.updated_at}
                    formatted_updated_at={draftOrder.formatted_updated_at}
                    grand_total={draftOrder.grand_total}
                    formatted_grand_total={draftOrder.formatted_grand_total}
                    srp_total={draftOrder.srp_total}
                    formatted_srp_total={draftOrder.formatted_srp_total}
                    customer_firstname={draftOrder.customer_firstname}
                    customer_middlename={draftOrder.customer_middlename}
                    customer_lastname={draftOrder.customer_lastname}
                    lfg_customer_id={draftOrder.lfg_customer_id}
                    customer_id={draftOrder.customer_id}
                    baseUrl={this.props.baseUrl}
                    isCopyOrderPage={this.props.isCopyOrderPage}
                    resumeUrl={this.props.draftOrderResumeUrl}
                    deleteDraftOrderPopup={this.deleteDraftOrderPopup}
                />
            ));
        }
    };

    debouncedOnInputChange = async keyword => {
        let formattedKeyword = keyword.toLowerCase().trim();
        let filteredDraftOrders = this.state.sourceData.filter(
            draftOrder =>
                (DraftOrderUtils.isDraftOrderIdExist(draftOrder) &&
                    `${draftOrder.entity_id}`.toLowerCase().includes(formattedKeyword)) ||
                (DraftOrderUtils.isDraftOrderCustomerLfgIdExist(draftOrder) &&
                    `${draftOrder.lfg_customer_id}`.toLowerCase().includes(formattedKeyword)) ||
                (DraftOrderUtils.isDraftOrderNameExist(draftOrder) &&
                    `${draftOrder.order_name}`.toLowerCase().includes(formattedKeyword)) ||
                (!DraftOrderUtils.isDraftOrderNameExist(draftOrder) &&
                    `
                ${draftOrder.customer_firstname}
                ${draftOrder.customer_middlename ? ` ${draftOrder.customer_middlename}` : ``}
                ${draftOrder.customer_lastname ? ` ${draftOrder.customer_lastname}` : ``}
            `
                        .toLowerCase()
                        .includes(formattedKeyword)) ||
                (DraftOrderUtils.isDraftOrderTypeExist(draftOrder) &&
                    `${draftOrder.order_type_label}`.toLowerCase().includes(formattedKeyword)) ||
                (DraftOrderUtils.isCreationDateExist(draftOrder) &&
                    `${draftOrder.formatted_created_at}`
                        .toLowerCase()
                        .includes(formattedKeyword)) ||
                (DraftOrderUtils.isModificationDateExist(draftOrder) &&
                    `${draftOrder.formatted_updated_at}`
                        .toLowerCase()
                        .includes(formattedKeyword)) ||
                (DraftOrderUtils.isGrandTotalExist(draftOrder) &&
                    `${draftOrder.formatted_grand_total}`.toLowerCase().includes(formattedKeyword))
        );

        this.setState({
            renderData: filteredDraftOrders,
        });
    };

    onInputChange = event => {
        this.debouncedOnInputChange(event.target.value);
    };

    deleteDraftOrderPopup = quoteId => {
        openPopup();

        this.setState({ quoteIdDelete: quoteId });
    };

    removeDeletedQuoteFromList = quoteId => {
        let renderData = this.state.renderData;

        _.each(renderData, (quote, index) => {
            if (+quote.entity_id === +quoteId) {
                renderData.splice(index, 1);
            }
        });

        this.setState({ renderData: renderData });
    };

    deleteDraftOrder = () => {
        this.setState({ deleting: true });
        axios({
            method: 'post',
            url: this.props.baseUrl + 'sales/quote/deletequote',
            params: {
                quote_id: this.state.quoteIdDelete,
            },
        })
            .then(res => {
                let sections = ['messages'];

                if (!res.data.success) {
                    console.error(res.data.errorMessage);
                }

                customerData.invalidate(sections);
                customerData.reload(sections);

                this.removeDeletedQuoteFromList(this.state.quoteIdDelete);
                this.setState({ deleting: false });

                closePopup();
            })
            .catch(err => {
                console.error(err);
                this.setState({ deleting: false });
                closePopup();
            });
    };

    sortData = dataToSort => {
        let renderData = this.state.renderData,
            sortDirection = this.state.sortOrder[dataToSort];

        if (sortDirection === SORT_ORDER_ASC) {
            if (dataToSort === 'grand_total' || dataToSort === 'srp_total') {
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
            if (dataToSort === 'grand_total' || dataToSort === 'srp_total') {
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
            <React.Fragment>
                <section className="draft-order-section dashboard-section">
                    <div className="section-title">
                        <h2>{$t('Draft orders')}</h2>
                    </div>
                    <div className="section-search-box-wrapper">
                        <input
                            className="search-input"
                            type="text"
                            placeholder={$t('Search')}
                            onChange={this.onInputChange}
                            disabled={!isFetchedSuccess}
                        />
                        <span className="search-icon" title={$t('Search draft orders icon')}>
                            {$t('Search draft orders icon')}
                        </span>
                    </div>
                    <div className="draft-order-header-container">
                        <div className="draft-order-header">
                            <div
                                className={`id sort-direction-${this.state.sortOrder.entity_id}`}
                                onClick={() => {
                                    this.sortData('entity_id');
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
                                        className={`title sort-direction-${
                                            this.state.sortOrder.customer_firstname
                                        }`}
                                        onClick={() => {
                                            this.sortData('customer_firstname');
                                        }}
                                    >
                                        {$t('Customer name')}
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
                                    this.state.sortOrder.formatted_created_at
                                }`}
                                onClick={() => {
                                    this.sortData('formatted_created_at');
                                }}
                            >
                                {$t('Creation date')}
                            </div>
                            <div
                                className={`modification-date sort-direction-${
                                    this.state.sortOrder.formatted_updated_at
                                }`}
                                onClick={() => {
                                    this.sortData('formatted_updated_at');
                                }}
                            >
                                {$t('Modification date')}
                            </div>
                            <div
                                className={`grand-total sort-direction-${
                                    this.state.sortOrder.grand_total
                                }`}
                                onClick={() => {
                                    this.sortData('grand_total');
                                }}
                            >
                                {$t('Grand total')}
                            </div>
                            <div
                                className={`srp-total sort-direction-${
                                    this.state.sortOrder.srp_total
                                }`}
                                onClick={() => {
                                    this.sortData('srp_total');
                                }}
                            >
                                {$t('Srp total')}
                            </div>
                        </div>
                        <div className="copy-proposal">
                            <span>{$t('Copy proposal')}</span>
                        </div>
                        <div className="delete-draft-order">
                            <span>{$t('Delete')}</span>
                        </div>
                    </div>
                    {renderData && _.isArray(renderData) && renderData.length > 0 ? (
                        <ul className="draft-order-container">{this.renderDraftOrders()}</ul>
                    ) : isFetching ? (
                        <TableLoader numberOfRow={8} />
                    ) : isFetchedError ? (
                        <div>{$t('Something goes wrong while fetching draft orders.')}</div>
                    ) : (
                        <div>{$t('No available draft order.')}</div>
                    )}
                </section>
                <ConfirmDeleteDraft
                    {...this.props}
                    deleteDraftOrder={this.deleteDraftOrder}
                    quoteId={this.state.quoteIdDelete}
                    deleting={this.state.deleting}
                />
            </React.Fragment>
        );
    }
}

export default DraftOrdersRenderer;
