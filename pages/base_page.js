'use strict';

const {By, Key, until} = require('selenium-webdriver');
const landingPageSelectors = require('../selectors/landingPage');
let timeout = 8000;

class BasePage {

    constructor(driver) {
        this.driver = driver;
    }

    async visit(url) {
        return await this.driver.get(url);
    }

    async quit() {
        return await this.driver.quit();
    }

    async closePopup(){
        await this.clickWithWait(landingPageSelectors.popup.close)
    }

    async findWithWait(locator) {
        await this.driver.wait(until.elementLocated(By.css(locator)), timeout);
        return await this.driver.findElement(By.css(locator))
    }

    async findMultipleElements(locator) {
        await this.driver.wait(until.elementsLocated(By.css(locator)), timeout);
        return await this.driver.findElements(By.css(locator));
    }
    async enterText(locator, text) {
        let textBox = await this.findWithWait(locator);
        await textBox.clear();
        return await textBox.sendKeys(text);
    }
    async clickWithWait(locator) {
        let element = await this.findWithWait(locator);
        await element.click();
    }
    async waitForElementVisibility(locator){
        let element = await this.driver.findElement(By.css(locator));
        await this.driver.wait(until.elementIsVisible(element), 5000);
        return element;
    }
    async hoverWithWait(locator){
        let men = await this.driver.findElement(By.css(locator));
        let isVisible = await this.driver.wait(until.elementIsVisible(men), 5000);
        let js = "var element = arguments[0];"
            + "var mouseEventObj = document.createEvent('MouseEvents');"
            + "mouseEventObj.initEvent( 'mouseover', true, true );"
            + "element.dispatchEvent(mouseEventObj);";
        await this.driver.executeScript(js, men);
    }
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
