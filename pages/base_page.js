'use strict';

const {By, Key, until} = require('selenium-webdriver');
const landingPageSelectors = require('../selectors/landingPage');
let timeout = 8000;
/*
   This is the class that will be extended by all the other classes.
   It contains basic functionalities that is common for all of the
   subclasses.
*/
class BasePage {
    /*
       Within this framework the webdriver object will be instantiated
       in the test files and the references to this object will be 
       passed around each of the page objects. 
    */
    constructor(driver) {
        this.driver = driver;
    }

    async visit(url) {
        return await this.driver.get(url);
    }

    async quit() {
        return await this.driver.quit();
    }
    // Upon navigation to the applcation under test, a popup always
    // pops up on the page. This functionlity handles it.
    async closePopup(){
        await this.clickWithWait(landingPageSelectors.popup.close)
    }
    // Waits for an element to be located for time that is defined on 
    // the global variable
    async findWithWait(locator) {
        await this.driver.wait(until.elementLocated(By.css(locator)), timeout);
        return await this.driver.findElement(By.css(locator))
    }
    // Same as above functionality but waits for mulitple webelements
    async findMultipleElements(locator) {
        await this.driver.wait(until.elementsLocated(By.css(locator)), timeout);
        return await this.driver.findElements(By.css(locator));
    }
    // Simplifies entering text on a text box by abstracting 
    // away the wait and clearing of a textbox
    async enterText(locator, text) {
        let textBox = await this.findWithWait(locator);
        await textBox.clear();
        return await textBox.sendKeys(text);
    }
    // after waiting for an element to be located for a set time,
    // clicks on the element
    async clickWithWait(locator) {
        let element = await this.findWithWait(locator);
        await element.click();
    }
    async waitForElementVisibility(locator){
        let element = await this.driver.findElement(By.css(locator));
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }
    /*
        Moves mouse to a weblement. In the application under test
        there are several dropdowns on the header of the main page.
        When a user hovers over one of those element, a drop down list 
        appears. 
    */
    async hoverWithWait(locator){
        let men = await this.driver.findElement(By.css(locator));
        let isVisible = await this.driver.wait(until.elementIsVisible(men), 5000);
        let js = "var element = arguments[0];"
            + "var mouseEventObj = document.createEvent('MouseEvents');"
            + "mouseEventObj.initEvent( 'mouseover', true, true );"
            + "element.dispatchEvent(mouseEventObj);";
        await this.driver.executeScript(js, men);
    }
    // Simplies the logic of selecting a value from a selection
    // of items like countries, state, etc. 
    async dropdownSelection(dropdownLocator, valueLocator){
        let selectElem = await this.findWithWait(dropdownLocator);
        await selectElem.click()
        await selectElem.findElement(By.css(valueLocator)).click();
    }
    
    async deleteAllCookies(){
        return await this.driver.manage().deleteAllCookies();
    }
}

module.exports = BasePage;
