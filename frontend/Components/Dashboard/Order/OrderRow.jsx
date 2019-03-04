/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React, { Component } from 'react';
import $t from 'mage/translate';
import pageNames from 'pageNames';

let { SALESPERSON_DASHBOARD_PAGE } = pageNames;

class OrderRow extends Component {
    constructor(props) {
        super(props);
        this.row = React.createRef();
    }

    componentDidMount = () => {
        if (window.location.hash) {
            let incrementIdHash = window.location.hash.replace('#', '');
            if (incrementIdHash === this.props.orderIncrementId) {
                this.row.current.scrollIntoView();
            }
        }
    };

    render() {
        return (
            <div className="orders-row-container">
                <div className="orders-row" ref={this.row}>
                    <div className="id">{this.props.orderIncrementId || $t('N/A')}</div>
                    {this.props.currentPageName === SALESPERSON_DASHBOARD_PAGE && (
                        <React.Fragment>
                            <div className="customer-lfg-id">
                                {this.props.customerLfgId || $t('N/A')}
                            </div>
                            <div className="customer-name">
                                {this.props.customerName || $t('N/A')}
                            </div>
                        </React.Fragment>
                    )}
                    <div className="order-type">{this.props.orderType || $t('N/A')}</div>
                    <div className="creation-date">{this.props.creationDate || $t('N/A')}</div>
                    <div className="grand-total">{this.props.grandTotal || $t('N/A')}</div>
                    <div className="srp-total">{this.props.srpTotal || $t('N/A')}</div>
                    <div className="view-order-container">
                        <a
                            href={`${this.props.orderViewUrl}?order_id=${this.props.orderId}`}
                            className="view-order-action"
                        >
                            <span>{$t('View')}</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderRow;
