/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SalespersonDashboard from 'SalespersonDashboard';
import urlBuilder from 'mage/url';
import pageLoader from 'pageLoader';

$.widget('vaimo.salespersonDashboardIndex', {
    options: {
        baseUrl: null,
        createNewOrderUrl: null,
        customerDashboardUrl: null,
        draftOrderUrl: null,
        draftOrderResumeUrl: null,
        isCopyOrderPage: false,
        salespersonCustomersUrl: null,
        salespersonId: null,
        formKey: $.mage.cookies.get('form_key'),
        currentCurrencyCode: null,
        orderViewUrl: null
    },

    _create: function() {
        urlBuilder.setBaseUrl(this.options.baseUrl);
        this.options.draftOrderUrl = urlBuilder.build('rest/V1/proposal/list');
        this.options.draftOrderResumeUrl = urlBuilder.build('negotiable_quote/quote/load');
        pageLoader.hideLoader();

        return ReactDOM.render(
            React.createElement(SalespersonDashboard, this.options),
            $(this.element)[0]
        );
    }
});

export default $.vaimo.salespersonDashboardIndex;
