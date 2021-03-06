
// Contains selectors for checkout page
module.exports = {
    guestCheckout: "input[id='login:guest']",
    firstname: "input[id='billing:firstname']",
    lastname: "input[id='billing:lastname']",
    company: "input[id='billing:company']",
    email: "input[id='billing:email']",
    address: "input[id='billing:street1']",
    city: "input[id='billing:city']",
    stateDropdown: "select[id='billing:region_id']",
    NewYork: "option[value='43']",
    zip: "input[id='billing:postcode']",
    countryDropdown: "select[id='billing:country_id']",
    telephone: "input[id='billing:telephone']",
    shipToThisAddress: "input[id='billing:use_for_shipping_yes']",
    continue: "button[id='onepage-guest-register-button']",
    groundShipping: "input[id='s_method_ups_GND']",
    threeDayshipping: "input[id='s_method_ups_3DS']",
    nextDayAir: "input[id='s_method_ups_1DA']",
    continueBilling: "#billing-buttons-container > button",
    continueShipping: "#shipping-method-buttons-container > button",
    cashPayment: "input[id='p_method_cashondelivery']",
    continuePayment: "#payment-buttons-container > button",
    placeOrder: "button[title='Place Order']",
    orderRecipt: "body > div > div.page > div.main-container.col1-layout > div > div > div.page-title > h1",
    confirmation: "h2[class='sub-title']"
}