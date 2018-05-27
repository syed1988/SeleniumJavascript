'use strict';
const Page = require('../base_page');
const menSelectors = require('../../selectors/men_selectors');
class NewArrivals extends Page {
    constructor(driver) {
        super(driver);
        this.driver = driver;
    }
    // Navigates to Men New Arrivals Page
    async goToNewArrivalsPage() {
        await super.hoverWithWait(menSelectors.dropdown);
        let newArrivals = await super.waitForElementVisibility(menSelectors.newArrivals);
        await newArrivals.click();
    }
    // Selects blazer from Men New Arrival page, it is one of 3 items
    // in that page. Could have abstracted this function to select any
    // of the 3 item. 
    async selectBlazer() {
        let locators = {
            itemLocator: menSelectors.blazerItem,
            colorDropdown: menSelectors.blazerColorDropDown,
            color: menSelectors.blazerColor,
            sizeDropdown: menSelectors.blazerSizeDropDown,
            size: menSelectors.blazerSize
        }
        await this.selectItemWithColorAndSize(locators);
    }
    // When adding an item to the cart, user can select how many items
    // they want to add, this functionality provides that option.
    async selectQuanitity(quantity){
        await super.enterText(menSelectors.quantity, quantity);
    }
    // After selecting an item and its size and color,
    // user can proceed to the cart via this functionality. 
    async addToCart(){
        super.clickWithWait(menSelectors.addToCart);
    }
    /*
        IN: Locators: {itemLocator: "css selector for item",
                       colorDropwdown: "css selector for colorDropdown",
                       color: "css selector for color",
                       sizeDropdown: "css selector for sizeDropDown",
                       size: "css selector for size"}
    */
    async selectItemWithColorAndSize(locators) {
        let item = await super.waitForElementVisibility(locators.itemLocator);
        await item.click();
        await super.dropdownSelection(locators.colorDropdown, locators.color);
        await super.dropdownSelection(locators.sizeDropdown, locators.size);
       
    }
}
module.exports = NewArrivals;