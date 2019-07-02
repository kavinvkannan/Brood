import {
  deals,
  getGoogleHomeDiscountedPrice,
  getAlexaDiscountedPrice,
  getMacAndPiDiscountedPrice
} from "../deals";

const macSKU = "43N23P";
const alexaSKU = "A304SD";
const piSKU = "234234";
const homeSKU = "120P90";

describe("Cumulative Deals and discount", () => {
  const scannedItems = [
    { sku: macSKU, quantity: 3 },
    { sku: piSKU, quantity: 2 },
    { sku: homeSKU, quantity: 10 },
    { sku: alexaSKU, quantity: 4 }
  ];
  it("should return the discounted total of all scanned items", () => {
    expect(deals({ scannedItems })).toBe(16994.09);
  });
});

describe("Each sale of a MacBook Pro comes with a free Raspberry Pi ", () => {
  it("should return the cost of only 3 Macs when 3 Rasberry Pi are scanned with it ", () => {
    const mac = { sku: macSKU, quantity: 3 };
    const pi = { sku: piSKU, quantity: 3 };
    expect(getMacAndPiDiscountedPrice(mac, pi)).toBe(16199.97);
  });

  it("should return the cost of only 1 Rasberry Pi", () => {
    const mac = { sku: macSKU, quantity: 1 };
    const pi = { sku: piSKU, quantity: 2 };
    expect(getMacAndPiDiscountedPrice(mac, pi)).toBe(5429.99);
  });
});

describe("Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers", () => {
  it("should return total of 4 alexas with 10% discounted price", () => {
    const items = { sku: alexaSKU, quantity: 4 };
    expect(getAlexaDiscountedPrice(items)).toBe(394.2);
  });
});

describe("Google Homes Deals", () => {
  it("should return price of 2 Google Homes", () => {
    const items = { sku: homeSKU, quantity: 3 };

    expect(getGoogleHomeDiscountedPrice(items)).toBe(99.98);
  });

  it("should return price of 3 Google Homes", () => {
    const items = { sku: homeSKU, quantity: 4 };
    expect(getGoogleHomeDiscountedPrice(items)).toBe(149.97);
  });

  it("should return price of 8 Google Homes", () => {
    const items = { sku: homeSKU, quantity: 11 };
    expect(getGoogleHomeDiscountedPrice(items)).toBe(399.92);
  });
});
