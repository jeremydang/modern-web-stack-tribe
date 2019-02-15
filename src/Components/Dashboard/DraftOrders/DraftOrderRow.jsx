/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React from 'react';
import $t from 'mage/translate';
import pageNames from 'pageNames';
import DraftOrderUtils from 'DraftOrderUtils';

let { SALESPERSON_DASHBOARD_PAGE, COPY_PROPOSAL_PAGE } = pageNames;

const DraftOrderRow = props => {
    let resumeUrl = !props.isCopyOrderPage ? `${props.resumeUrl}/quote_id/${props.entity_id}` : ``;
    let copyProposalUrl = `${props.baseUrl}negotiable_quote/copyproposal/index?quote_id=${
        props.entity_id
    }&customer_id=${props.customer_id}`;

    return (
        <div className="draft-order-row">
            <a className="draft-order-row-container" href={resumeUrl}>
                <div className="id">
                    {DraftOrderUtils.isDraftOrderIdExist(props) ? props.entity_id : $t('N/A')}
                </div>
                {(props.currentPageName === SALESPERSON_DASHBOARD_PAGE ||
                    props.currentPageName === COPY_PROPOSAL_PAGE) && (
                    <React.Fragment>
                        <div className="customer-lfg-id">
                            {DraftOrderUtils.isDraftOrderCustomerLfgIdExist(props)
                                ? props.lfg_customer_id
                                : $t('N/A')}
                        </div>
                        <div className="title">
                            {DraftOrderUtils.isDraftOrderNameExist(props)
                                ? props.order_name
                                : `
                                ${props.customer_firstname}
                                ${props.customer_middlename ? ` ${props.customer_middlename}` : ``}
                                ${props.customer_lastname ? ` ${props.customer_lastname}` : ``}
                            `}
                        </div>
                    </React.Fragment>
                )}
                <div className="order-type">
                    {DraftOrderUtils.isDraftOrderTypeExist(props)
                        ? props.order_type_label
                        : $t('N/A')}
                </div>
                <div className="creation-date">
                    {DraftOrderUtils.isCreationDateExist(props)
                        ? props.formatted_created_at
                        : $t('N/A')}
                </div>
                <div className="modification-date">
                    {DraftOrderUtils.isModificationDateExist(props)
                        ? props.formatted_updated_at
                        : $t('N/A')}
                </div>
                <div className="grand-total">
                    {DraftOrderUtils.isGrandTotalExist(props)
                        ? props.formatted_grand_total
                        : $t('N/A')}
                </div>
                <div className="srp-total">
                    {DraftOrderUtils.isSrpTotalExist(props) ? props.formatted_srp_total : $t('N/A')}
                </div>
            </a>
            <div className="copy-proposal">
                {props.is_preorder &&
                    !props.isCopyOrderPage && (
                        <a className="copy-proposal" href={copyProposalUrl}>
                            {$t('Copy')}
                        </a>
                    )}
            </div>
            <div className="delete-draft-order">
                <span
                    className="delete-draft-order"
                    onClick={() => props.deleteDraftOrderPopup(props.entity_id)}
                >
                    {$t('Delete')}
                </span>
            </div>
        </div>
    );
};

export default DraftOrderRow;
