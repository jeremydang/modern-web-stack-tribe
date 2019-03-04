/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React from 'react';
import $t from 'mage/translate';

const ConfirmDeleteDraft = props => {
    let deleteText = props.deleting ? 'Deleting...' : 'Delete',
        disableBtn = props.deleting ? 'disable' : '',
        deleteDraftMessage = window.deleteDraftMessage
            ? window.deleteDraftMessage
            : 'Are you sure you want to delete selected draft?';
    return (
        <div className="confirm-delete-draft-container luhta-smt-popup">
            <div className="message"
                 dangerouslySetInnerHTML={{__html: deleteDraftMessage}}>
            </div>
            <div className="button-container">
                <div className="action primary button-cancel" id="cancel-delete-draft-button">
                    {$t('Cancel')}
                </div>
                <div
                    className={`action secondary button-delete ${disableBtn}`}
                    id="confirm-delete-draft-button"
                    disabled={props.deleting}
                    onClick={props.deleteDraftOrder}
                >
                    {$t(deleteText)}
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteDraft;
