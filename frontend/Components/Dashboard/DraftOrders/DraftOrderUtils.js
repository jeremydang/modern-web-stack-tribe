/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

export default {
    isDraftOrderIdExist: draftOrder => {
        return draftOrder.entity_id;
    },
    isDraftOrderCustomerLfgIdExist: draftOrder => {
        return draftOrder.lfg_customer_id;
    },
    isDraftOrderNameExist: draftOrder => {
        return draftOrder.order_name;
    },
    isDraftOrderTypeExist: draftOrder => {
        return draftOrder.order_type_label;
    },
    isCreationDateExist: draftOrder => {
        return draftOrder.created_at;
    },
    isModificationDateExist: draftOrder => {
        return draftOrder.updated_at;
    },
    isGrandTotalExist: draftOrder => {
        return draftOrder.grand_total;
    },
    isSrpTotalExist: draftOrder => {
        return draftOrder.srp_total;
    },
};
