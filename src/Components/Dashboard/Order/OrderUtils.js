/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

export default {
    isOrderIdExist: order => {
        return order.increment_id;
    },
    isOrderCustomerLfgIdExist: order => {
        return order.lfg_customer_id;
    },
    isOrderCustomerNameExist: order => {
        return order.customer_name;
    },
    isOrderTypeExist: order => {
        return order.order_type;
    },
    isCreationDateExist: order => {
        return order.created_at;
    },
    isGrandTotalExist: order => {
        return order.grand_total;
    },
    isSrpTotalExist: order => {
        return order.srp_total;
    },
    sortOrderCreationdDate: (a, b) => {
        let dateA = a.raw_created_at,
            dateB = b.raw_created_at;
        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
    },
};
