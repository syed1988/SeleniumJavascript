'use strict';
const Page = require('./base_page');
const checkoutSelectors = require('../selectors/checkout_selectors');
class CheckoutPage extends Page{
    constructor(driver){
        super(driver);
        this.driver = driver;
    }
    async checkoutAsGuest(){
        let guestRadioButton = await super.findWithWait(checkoutSelectors.guestCheckout);
        let isSelected = await guestRadioButton.isSelected();
        if(!isSelected){
            await guestRadioButton.click();
        }
        await super.clickWithWait(checkoutSelectors.continue);
    }
    async enterBillingInfo(){
        await super.enterText(checkoutSelectors.firstname, 'selenium');
        await super.enterText(checkoutSelectors.lastname, 'syed');
        await super.enterText(checkoutSelectors.company,'Epix');
        await super.enterText(checkoutSelectors.email, 'seleniumSyed@gmail.com');
        await super.enterText(checkoutSelectors.address, '123 Fake street');
        await super.enterText(checkoutSelectors.city, 'NYC');
        await super.dropdownSelection(checkoutSelectors.stateDropdown, checkoutSelectors.NewYork);
        await super.enterText(checkoutSelectors.zip, '10010');
        await super.enterText(checkoutSelectors.telephone, '6462384600');
        await super.clickWithWait(checkoutSelectors.continueBilling);
    }
    async selectGroundShipping(){
        await super.clickWithWait(checkoutSelectors.groundShipping);
        await super.clickWithWait(checkoutSelectors.continueShipping);
    }
    async selectCashPayment(){
        await super.clickWithWait(checkoutSelectors.cashPayment);
        await super.clickWithWait(checkoutSelectors.continuePayment);
    }
    async placeOrder(){
        await super.clickWithWait(checkoutSelectors.placeOrder);
    }
    async orderRecipt(){
        return await super.findWithWait(checkoutSelectors.orderRecipt);
    }
}

module.exports = CheckoutPage;