"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = require("../inventory/inventory");
const lodash_1 = require("lodash");
const apollo_server_core_1 = require("apollo-server-core");
const macSKU = "43N23P";
const alexaSKU = "A304SD";
const piSKU = "234234";
const homeSKU = "120P90";
const sku = "sku";
/**
 * This method takes an input attribute 'params'
 * and routes to different discount calculation methods based on the input param.
 *
 * The reason to have as many variables and constants is for easy reading and debugging.
 *
 * The methods are broken down to support the single reason change aspect of SOLID principle.
 *
 * Yet there much room for improvements, where we can create an interface that hs runPricing or QuantityValidation check
 **/
function deals(params) {
    const { scannedItems } = params;
    const mac = lodash_1.find(scannedItems, [sku, macSKU]);
    const pi = lodash_1.find(scannedItems, [sku, piSKU]);
    const home = lodash_1.find(scannedItems, [sku, homeSKU]);
    const alexa = lodash_1.find(scannedItems, [sku, alexaSKU]);
    let macAndPiPrice = 0;
    let homePrice = 0;
    let alexaPrice = 0;
    // Mac + Rasberry Pi
    try {
        if (mac &&
            mac.quantity > 0 &&
            (pi && pi.quantity > 0) &&
            isValid(mac) &&
            isValid(pi))
            macAndPiPrice = getMacAndPiDiscountedPrice(mac, pi);
        else if (mac && mac.quantity > 0 && isValid(mac))
            macAndPiPrice += mac * lodash_1.find(inventory_1.items, [sku, macSKU]).price;
        else if (pi && pi.quantity > 0 && isValid(pi))
            macAndPiPrice += pi * lodash_1.find(inventory_1.items, [sku, piSKU]).price;
        // Google Home
        if (home && home.quantity > 0 && isValid(home))
            homePrice = getGoogleHomeDiscountedPrice(home);
        //Alexa
        if (alexa && alexa.quantity > 0 && isValid(alexa))
            alexaPrice = getAlexaDiscountedPrice(alexa);
    }
    catch (error) {
        console.error("INTERNAL_SERVER_ERROR: ", error);
        throw error;
    }
    if (macAndPiPrice == 0 && homePrice == 0 && alexaPrice == 0)
        throw new apollo_server_core_1.ApolloError("The input does not contain a valid inventory item");
    return macAndPiPrice + homePrice + alexaPrice;
}
exports.deals = deals;
function isValid(item) {
    if (item.quantity <= lodash_1.find(inventory_1.items, [sku, item.sku]).inventoryQty)
        return true;
    else
        throw new apollo_server_core_1.UserInputError("The input quantity exceeds the inventory quantity");
}
exports.isValid = isValid;
/**
 * This method is to calculate discount for Resberry Pi devices.
 *
 * If the scanned item contains both Macbook pro and Rasberry Pi, then
 * each macbook pro gets a free Rasberry Pi.
 **/
function getMacAndPiDiscountedPrice(macItem, piItem) {
    const mac = lodash_1.find(inventory_1.items, [sku, macSKU]);
    const pi = lodash_1.find(inventory_1.items, [sku, piSKU]);
    let piCount = piItem ? piItem.quantity : 0;
    if (macItem.quantity > 0 && piCount > 0)
        piCount = piCount - macItem.quantity > 0 ? piCount - macItem.quantity : 0;
    return piCount * pi.price + macItem.quantity * mac.price;
}
exports.getMacAndPiDiscountedPrice = getMacAndPiDiscountedPrice;
/**
 * This method is to calculate discount for Alexa devices.
 *
 * If the input quantity is greater than 3, then 10% discount is applied to each of the device.
 **/
function getAlexaDiscountedPrice(alexaItem) {
    const alexa = lodash_1.find(inventory_1.items, [sku, alexaSKU]);
    let alexaTotalPrice;
    if (alexaItem.quantity > 3) {
        const alexaDiscountedPrice = alexa.price - alexa.price * 0.1;
        alexaTotalPrice = alexaItem.quantity * alexaDiscountedPrice;
    }
    else {
        alexaTotalPrice = alexaItem.quantity * alexa.price;
    }
    return alexaTotalPrice;
}
exports.getAlexaDiscountedPrice = getAlexaDiscountedPrice;
/**
 * Method to calculate google home discount.
 *
 * The input quantity should be atleast 3 in order to make the discpount effective.
 * */
function getGoogleHomeDiscountedPrice(homeItem) {
    const home = lodash_1.find(inventory_1.items, [sku, homeSKU]);
    let count = homeItem.quantity;
    if (count > 2) {
        for (var i = 1; i <= count; i++) {
            if (i % 3 == 0) {
                count--;
            }
        }
    }
    return count * home.price;
}
exports.getGoogleHomeDiscountedPrice = getGoogleHomeDiscountedPrice;
//# sourceMappingURL=deals.js.map