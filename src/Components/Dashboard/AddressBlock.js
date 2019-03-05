/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import React from 'react';

const AddressBlock = ({address}) => {
    return (
        <div>
            {address.streets && address.streets.length > 0 ? address.streets.map((street, index) =>
                <div key={index} className="company-street">{street}</div>
            ) : null}
            <div>
                {address.city ? <span className="company-city">{address.city}</span> : null}
                {address.region ?
                    <span>
                        <span>, </span>
                        <span className="company-region">{address.region}</span>
                    </span>
                : null}
                {address.postcode ?
                    <span>
                        <span>, </span>
                        <span className="company-postcode">{address.postcode}</span>
                    </span>
                : null}
            </div>
            {address.country ? <div className="company-country">{address.country}</div> : null}
        </div>
    );
};

export default AddressBlock;
