'use strict';
const Page = require('./base_page');
const shoppingCartSelectors = require('../selectors/shopping_cart_selectors');
class ShoppingCartPage extends Page{
    constructor(driver){
        super(driver);
        this.driver = driver;
    }
    // Filling out basic info before proceeding to checkout
    async fillShippingForm(){
       let selectState = await super.dropdownSelection(shoppingCartSelectors.stateDropdown, 
                                                       shoppingCartSelectors.NewYork);
       let city = await super.enterText(shoppingCartSelectors.city, 'NYC');
       let zip = await super.enterText(shoppingCartSelectors.zip, '10010');
    }
    async checkout(){
        await super.clickWithWait(shoppingCartSelectors.checkout);
    }
}
module.exports = ShoppingCartPage;