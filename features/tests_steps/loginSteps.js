const LoginPage = require('../pages/loginPage');
const constLogin = require('../support/constantsLogin');
const { createDriver } = require('../../utils/webdriver');
const { navigateToURL } = require('../support/utils');
const {Given,When,Then,setDefaultTimeout} = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const HomePage = require('../pages/homePage');
const assert = require('chai').assert;



setDefaultTimeout(30000); 
let driver;
let consts = new constLogin();


Given('Open the login page', async () =>{

    driver = await createDriver();
    driver.manage().window().maximize();
    await navigateToURL(driver,'/intl/en');

});

When('I enter valid credentials', async () => {
    const loginPage = new LoginPage(driver);
    await driver.wait(until.elementLocated(By.xpath(consts.locator_login_path)), 20000);
    await loginPage.clickLoginPage(consts.locator_login_path);
    await driver.wait(until.elementLocated(By.id(consts.locator_username_by_id)), 5000);
    await loginPage.enterCredentialsUsername(consts.locator_username_by_id,consts.email_to_login);
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id(consts.locator_password_by_id))), 10000);
    await loginPage.enterCredentialsPassword(consts.locator_password_by_id,consts.password_to_login);

});

Then('click the login button', async () => {
    const loginPage = new LoginPage(driver);
    await loginPage.clickLoginButton(consts.locator_button_login_by_id);
});

Then('I should write a note', async () => {
    const homePage = new HomePage(driver);
    //const elementLocator = By.id(); 
    await driver.wait(until.elementLocated(By.id(consts.locator_createNote_button_by_id)), 30000);
    await homePage.clickCreateNote(consts.locator_createNote_button_by_id);

    try {
        // Switch to the iframe if it exists qa-COMMON_EDITOR_IFRAME
        await driver.wait(until.elementLocated(By.id(consts.locator_frame_document_by_id)), 10000);
        const iframeElement = await driver.findElement(By.id(consts.locator_frame_document_by_id)); 
        if (iframeElement) {
            await driver.switchTo().frame(iframeElement);
        }

        // click on Title and write a title.
        await homePage.clickOnTitle(consts.locator_title_note_by_xpath);
        await homePage.sendNewNote(consts.locator_title_note_by_xpath, consts.title_note);

        // write a description.
        await driver.wait(until.elementLocated(By.xpath(consts.locator_description_note_by_xpath)), 10000);
        await homePage.sendNewNote(consts.locator_description_note_by_xpath, consts.description_note);
        await driver.sleep(2000);

        //switch back to the default content
        if (iframeElement) {
            await driver.switchTo().defaultContent();
        }
    } catch (error) {
        console.error('Error:', error);
    }

});

Then('I should logout', async () => {
    const homePage = new HomePage(driver);

    await driver.wait(until.elementLocated(By.xpath(consts.locator_option_logout_by_xpath)), 10000);
    await homePage.clickUserOptions(consts.locator_option_logout_by_xpath);

    await driver.wait(until.elementLocated(By.xpath(consts.locator_logout_button_by_xpath)), 10000);
    await homePage.clickLogoutOption(consts.locator_logout_button_by_xpath);

    try {
        await driver.wait(until.elementLocated(By.id(consts.locator_message_logout_by_id)), 5000);

        await driver.wait(until.elementLocated(By.id(consts.Locator_Confirm_Logout)), 5000);
        await homePage.clickConfirmLogout(consts.Locator_Confirm_Logout);

    } catch (error) {
        console.log('Confirm message was not found, continue with the logout');
    }

});

/*
I left this code because before appear the home page and now appear the loginpage
Then('I should be redirected to the homepage', async () => {
    //expectedMessage ="You have logged out of Evernote.";
    expectedMessage="Te has desconectado de Evernote."
    const xpathExpression = '//div[contains(@class, "logout-content")]//h1[text()="Te has desconectado de Evernote."]';
    await driver.wait(until.elementLocated(By.xpath(xpathExpression)), 15000);
    const messageElement = await driver.findElement(By.xpath(xpathExpression));
    const messageActual = await messageElement.getText();
    console.log(messageActual);
    assert.equal(messageActual,expectedMessage)

});*/

Then('I should log in again', async () => {
    const loginPage = new LoginPage(driver);
    
    await driver.wait(until.elementLocated(By.id(consts.locator_username_by_id)), 5000);
    await loginPage.enterCredentialsUsername(consts.locator_username_by_id,consts.email_to_login);
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id(consts.locator_password_by_id))), 5000);
    await loginPage.enterCredentialsPassword(consts.locator_password_by_id,consts.password_to_login);
    await loginPage.clickLoginButton(consts.locator_button_login_by_id);

});


Then('I should open the note created', async () => {

    await driver.wait(until.elementLocated(By.xpath(consts.locator_note_created)),20000);
   
    const noteCreatedFound = await driver.findElement(By.xpath(consts.locator_title_on_note_created));
    const mensajeTexto = await noteCreatedFound.getText();
    assert.strictEqual(mensajeTexto, 'Automation testing by Jhosedith');

    await driver.findElement(By.xpath(consts.locator_to_click_note_created)).click();
});

Then('I should delete the note created', async () => {

    await driver.wait(until.elementLocated(By.xpath(consts.locator_options_note)),20000);
    await driver.findElement(By.xpath(consts.locator_options_note)).click();

    await driver.wait(until.elementLocated(By.xpath(consts.locator_option_delete_note)),20000);
    await driver.findElement(By.xpath(consts.locator_option_delete_note)).click();

});

Then('I should log out again', async () => {
    const homePage = new HomePage(driver);

    await driver.wait(until.elementLocated(By.xpath(consts.locator_option_logout_by_xpath)), 10000);
    await homePage.clickUserOptions(consts.locator_option_logout_by_xpath);

    await driver.wait(until.elementLocated(By.xpath(consts.locator_logout_button_by_xpath)), 10000);
    await homePage.clickLogoutOption(consts.locator_logout_button_by_xpath);

    try {
        await driver.wait(until.elementLocated(By.id(consts.locator_message_logout_by_id)), 20000);

        await driver.wait(until.elementLocated(By.id(consts.Locator_Confirm_Logout)), 10000);
        await homePage.clickConfirmLogout(consts.Locator_Confirm_Logout);
    } catch (error) {

        console.log('Confirm message was not found, continue with the logout');
    }

});

Then('I should not log in with a correct email and incorrect password', async () => {
    const loginPage = new LoginPage(driver);

    await driver.wait(until.elementLocated(By.id(consts.locator_username_by_id)), 20000);
    await loginPage.enterCredentialsUsername(consts.locator_username_by_id,consts.email_to_login);
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id(consts.locator_password_by_id))), 10000);
    await loginPage.enterCredentialsPassword(consts.locator_password_by_id,consts.password_wrong_to_login);
    await loginPage.clickLoginButton(consts.locator_button_login_by_id);
    await driver.quit();
});



