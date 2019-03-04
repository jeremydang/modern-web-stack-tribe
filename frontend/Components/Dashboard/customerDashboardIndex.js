/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomerDashboard from 'CustomerDashboard';
import pageLoader from 'pageLoader';
import customerData from 'Magento_Customer/js/customer-data';
import urlBuilder from 'mage/url';

$.widget('vaimo.customerDashboardIndex', {
    options: {
        baseUrl: null,
        createNewOrderUrl: null,
        customerId: null,
        customerAddresses: null,
        customerOrders: null,
        currentCurrencyCode: null,
        orderViewUrl: null,
        formKey: $.mage.cookies.get('form_key'),
        isCopyOrderPage: false,
        draftOrderUrl: null,
        draftOrderResumeUrl: null
    },

    _create: function() {
        urlBuilder.setBaseUrl(this.options.baseUrl);
        this.options.draftOrderUrl = urlBuilder.build('rest/V1/proposal/customer');
        this.options.draftOrderResumeUrl = urlBuilder.build('negotiable_quote/quote/load');
        pageLoader.hideLoader();

        let sections = ['customer', 'cart'];
        customerData.invalidate(sections);
        customerData.reload(sections, true);

        return ReactDOM.render(
            React.createElement(CustomerDashboard, this.options),
            $(this.element)[0]
        );
    },
});

export default $.vaimo.customerDashboardIndex;
