'use strict';
const Page = require('../pages/base_page');
const MenNewArrivals = require('../pages/men_pages/new_arrivals_page');
const ShoppingCartPage = require('../pages/shopping_cart_page');
const CheckoutPage = require('../pages/checkout_page');
const config = require('../config');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
//selectors
const menSelectors = require('../selectors/men_selectors');
let should = require('chai').should();

describe('Basic Tests', function(){
    this.timeout(15000);
    let driver = new webdriver.Builder()
            .forBrowser(config.browser.chrome)
            .build();
    const page = new Page(driver);

    before(async function(){
        let mainPage = await page.visit(config.url);
        await page.closePopup();
    })
    after(async function(){
        await page.deleteAllCookies();
        await page.quit();
    })
    it('Page title should match the expected page title', async function(){
       let pageTitle = await driver.getTitle();
        pageTitle.should.be.equal('Madison Island')
    })
    it('Navigate to men new arrivals', async function(){
        const menNewArrivals = new MenNewArrivals(driver);
        await menNewArrivals.goToNewArrivalsPage();
        let newArrivalsTitle = await driver.getTitle();
        newArrivalsTitle.should.be.equal('New Arrivals - Men');
    })
})

describe('Creating orders', function () {
    this.timeout(50000);
    let driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
            
    const page = new Page(driver);
    const menNewArrivals = new MenNewArrivals(driver);
    const shoppingCartPage = new ShoppingCartPage(driver);
    const checkoutPage = new CheckoutPage(driver);

    before(async function(){
        let mainPage = await page.visit(config.url);
        await page.closePopup();
    })
    after(async function(){
        await page.deleteAllCookies();
        await page.quit();
    })
    // An end to end test from selecting an item to adding it to cart
    // to checkout out to placing the order and confirming it has been placed.
    it('users should be able to submit a order', async () => {
        //navigate to Men Arrival Page
        await menNewArrivals.goToNewArrivalsPage();
        let newArrivalsTitle = await driver.getTitle();
        // Assert you are in the right page
        newArrivalsTitle.should.be.equal('New Arrivals - Men');
        await menNewArrivals.selectBlazer();
        await menNewArrivals.addToCart();
        await shoppingCartPage.fillShippingForm();
        await shoppingCartPage.checkout();
        await checkoutPage.checkoutAsGuest();
        await checkoutPage.enterBillingInfo();
        await checkoutPage.selectGroundShipping();
        await checkoutPage.selectCashPayment();
        await checkoutPage.placeOrder();
        let receipt = await checkoutPage.orderRecipt();
        receipt = await receipt.getText();
        receipt.should.be.equal('YOUR ORDER HAS BEEN RECEIVED.');
    })
})