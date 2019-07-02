import { items } from "../inventory/inventory";
import { find } from "lodash";
import { ApolloError, UserInputError } from "apollo-server-core";

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
export function deals(params: any) {
  const { scannedItems } = params;
  const mac = find(scannedItems, [sku, macSKU]);
  const pi = find(scannedItems, [sku, piSKU]);
  const home = find(scannedItems, [sku, homeSKU]);
  const alexa = find(scannedItems, [sku, alexaSKU]);
  let macAndPiPrice = 0;
  let homePrice = 0;
  let alexaPrice = 0;

  // Mac + Rasberry Pi

  try {
    if (
      mac &&
      mac.quantity > 0 &&
      (pi && pi.quantity > 0) &&
      isValid(mac) &&
      isValid(pi)
    )
      macAndPiPrice = getMacAndPiDiscountedPrice(mac, pi);
    else if (mac && mac.quantity > 0 && isValid(mac))
      macAndPiPrice += mac * find(items, [sku, macSKU]).price;
    else if (pi && pi.quantity > 0 && isValid(pi))
      macAndPiPrice += pi * find(items, [sku, piSKU]).price;

    // Google Home
    if (home && home.quantity > 0 && isValid(home))
      homePrice = getGoogleHomeDiscountedPrice(home);

    //Alexa
    if (alexa && alexa.quantity > 0 && isValid(alexa))
      alexaPrice = getAlexaDiscountedPrice(alexa);
  } catch (error) {
    console.error("INTERNAL_SERVER_ERROR: ", error);
    throw error;
  }

  if (macAndPiPrice == 0 && homePrice == 0 && alexaPrice == 0)
    throw new ApolloError("The input does not contain a valid inventory item");

  return macAndPiPrice + homePrice + alexaPrice;
}

export function isValid(item: any) {
  if (item.quantity <= find(items, [sku, item.sku]).inventoryQty) return true;
  else
    throw new UserInputError(
      "The input quantity exceeds the inventory quantity"
    );
}

/**
 * This method is to calculate discount for Resberry Pi devices.
 *
 * If the scanned item contains both Macbook pro and Rasberry Pi, then
 * each macbook pro gets a free Rasberry Pi.
 **/
export function getMacAndPiDiscountedPrice(macItem: any, piItem: any) {
  const mac = find(items, [sku, macSKU]);
  const pi = find(items, [sku, piSKU]);
  let piCount = piItem ? piItem.quantity : 0;

  if (macItem.quantity > 0 && piCount > 0)
    piCount = piCount - macItem.quantity > 0 ? piCount - macItem.quantity : 0;

  return piCount * pi.price + macItem.quantity * mac.price;
}

/**
 * This method is to calculate discount for Alexa devices.
 *
 * If the input quantity is greater than 3, then 10% discount is applied to each of the device.
 **/
export function getAlexaDiscountedPrice(alexaItem: any) {
  const alexa = find(items, [sku, alexaSKU]);
  let alexaTotalPrice;

  if (alexaItem.quantity > 3) {
    const alexaDiscountedPrice = alexa.price - alexa.price * 0.1;
    alexaTotalPrice = alexaItem.quantity * alexaDiscountedPrice;
  } else {
    alexaTotalPrice = alexaItem.quantity * alexa.price;
  }
  return alexaTotalPrice;
}

/**
 * Method to calculate google home discount.
 *
 * The input quantity should be atleast 3 in order to make the discpount effective.
 * */
export function getGoogleHomeDiscountedPrice(homeItem: any) {
  const home = find(items, [sku, homeSKU]);
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
