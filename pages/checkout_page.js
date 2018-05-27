'use strict';
const Page = require('./base_page');
const checkoutSelectors = require('../selectors/checkout_selectors');
class CheckoutPage extends Page{
    constructor(driver){
        super(driver);
        this.driver = driver;
    }
    // Option to checkout as guest or a signed user.
    // Chose to just implement the functionality to checkout as guest.
    async checkoutAsGuest(){
        let guestRadioButton = await super.findWithWait(checkoutSelectors.guestCheckout);
        let isSelected = await guestRadioButton.isSelected();
        if(!isSelected){
            await guestRadioButton.click();
        }
        await super.clickWithWait(checkoutSelectors.continue);
    }
    // Entering customer info on the form in the checkout page. 
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
    // Selecting one of many shipping option, could have abstracted this
    // function to select any of the available options.
    async selectGroundShipping(){
        await super.clickWithWait(checkoutSelectors.groundShipping);
        await super.clickWithWait(checkoutSelectors.continueShipping);
    }
    // Same as above! selecting one of number of ways of paying
    async selectCashPayment(){
        await super.clickWithWait(checkoutSelectors.cashPayment);
        await super.clickWithWait(checkoutSelectors.continuePayment);
    }
    // clicking on place order
    async placeOrder(){
        await super.clickWithWait(checkoutSelectors.placeOrder);
    }
    // After placing an order, users are directed to a submission page.
    // which has message of receipt of order. Below functionality returns
    // a webelement to a message indicating receipt of order. 
    async orderRecipt(){
        return await super.findWithWait(checkoutSelectors.orderRecipt);
    }
}

module.exports = CheckoutPage;