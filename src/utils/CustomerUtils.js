/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

import _ from "underscore";

let isNameExist = customer => {
    return customer.name;
};

let isLfgIdExist = customer => {
    return customer.lfg_customer_id;
};

let isAddressesExist = customer => {
    return customer.addresses &&
        _.isArray(customer.addresses)
        && customer.addresses.length > 0;
};

let isStreetExist = customer => {
    return isAddressesExist(customer) &&
        customer.addresses[0].streets &&
        _.isArray(customer.addresses[0].streets) &&
        customer.addresses[0].streets.length > 0;
};

let isCityExist = customer => {
    return isAddressesExist(customer) && customer.addresses[0].city;
};

let isCountryExist = customer => {
    return isAddressesExist(customer) &&customer.addresses[0].country;
};

export default {
    isNameExist,
    isLfgIdExist,
    isAddressesExist,
    isStreetExist,
    isCityExist,
    isCountryExist
}
