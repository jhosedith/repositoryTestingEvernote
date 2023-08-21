const LoginPage = require('../pages/loginPage');
const constLogin = require('../support/constantsLogin');
const { createDriver } = require('../../utils/webdriver');
const { navigateToURL } = require('../support/utils');
const {Given,When,Then,setDefaultTimeout} = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const HomePage = require('../pages/homePage');
const assert = require('chai').assert;


let loginPage;
let homePage;
setDefaultTimeout(30000); 
let driver;



Given('Open the login page', async () =>{
    driver = await createDriver();
    loginPage = new LoginPage(driver);
    homePage = new HomePage(driver)
    driver.manage().window().maximize();
    await navigateToURL(driver,'/intl/en');
});

When('I enter valid credentials', async () => {
    await driver.wait(until.elementLocated(By.xpath(".//a[contains(@href,'https://www.evernote.com/Login.action') and text()='Log In']")), 20000);
    await loginPage.clickLoginPage(".//a[contains(@href,'https://www.evernote.com/Login.action') and text()='Log In']");
    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await loginPage.enterCredentialsUsername('username','jhosedithbravo.23ar@gmail.com');
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('password'))), 10000);
    await loginPage.enterCredentialsPassword('password','Welcome01!');

});

Then('click the login button', async () => {
    await loginPage.clickLoginButton('loginButton');
});

Then('I should write a note', async () => {
    const elementLocator = By.id('qa-HOME_NOTE_WIDGET_CREATE_NOTE'); 
    await driver.wait(until.elementLocated(elementLocator), 30000);
    await homePage.clickCreateNote('qa-HOME_NOTE_WIDGET_CREATE_NOTE');

    try {
        // Switch to the iframe if it exists qa-COMMON_EDITOR_IFRAME
        await driver.wait(until.elementLocated(By.id('qa-COMMON_EDITOR_IFRAME')), 10000);
        const iframeElement = await driver.findElement(By.id('qa-COMMON_EDITOR_IFRAME')); 
        if (iframeElement) {
            await driver.switchTo().frame(iframeElement);
        }

        // Use By.xpath() to locate the target <br> element within <div> element
        const xpathTitle = "//div[contains(@class, 'P0rnC')]//textarea[contains(@class, 'dSbRl s9EjL')]"
        const xpathDescription = "//div[contains(@class, 'para')]//br[contains(@class, 'ProseMirror-trailingBreak')]";
       
        /* const targetElementTitle = await driver.findElement(By.xpath(xpathTitle));
        await targetElementTitle.sendKeys("Automation testing by Jhosedith");*/

        // click on Title and write a title.
        await homePage.clickOnTitle(xpathTitle);
        await homePage.sendNewNote(xpathTitle, 'Automation testing by Jhosedith');

        // click on Title and write a title.
        await driver.wait(until.elementLocated(By.xpath(xpathDescription)), 10000);
        await homePage.sendNewNote(xpathDescription, 'Automation testing using nodejs, selenium with cucumber');
       //here I should put a waitUntilLocated maybe located the description in the label in the left side
        await driver.sleep(5000);

        //switch back to the default content
        if (iframeElement) {
            await driver.switchTo().defaultContent();
        }
    } catch (error) {
        console.error('Error:', error);
    }

});

Then('I should logout', async () => {

    const xpath = '//li[contains(@class, "UyggXMRtZuBvlSJ5dJsD")]//div[@id= "qa-NAV_USER"]';
    await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
    await homePage.clickUserOptions(xpath);

    const xpathLogout = '//li[contains(@class, "ivs2kscNg5rtC99cXXHO")]//a[@id= "qa-ACCOUNT_DROPDOWN_LOGOUT"]';
    await driver.wait(until.elementLocated(By.xpath(xpathLogout)), 10000);
    await homePage.clickLogoutOption(xpathLogout);

    try {
        idMessage = 'qa-LOGOUT_CONFIRM_DIALOG_MESSAGE';
        await driver.wait(until.elementLocated(By.id(idMessage)), 20000);

        // Si se encuentra el mensaje, tomar la acción necesaria (hacer logout)
        idConfirmLogout= 'qa-LOGOUT_CONFIRM_DIALOG_CANCEL'
        await driver.wait(until.elementLocated(By.id(idConfirmLogout)), 10000);
        await homePage.clickConfirmLogout(idConfirmLogout);
    } catch (error) {
        // La excepción indica que el mensaje no está presente, continuar con el flujo normal
        console.log('Mensaje de confirmación no encontrado, continuando con el flujo normal del logout');
    }

});

Then('I should be redirected to the homepage', async () => {
    //expectedMessage ="You have logged out of Evernote.";
    expectedMessage="Te has desconectado de Evernote."
    const xpathExpression = '//div[contains(@class, "logout-content")]//h1[text()="Te has desconectado de Evernote."]';
    await driver.wait(until.elementLocated(By.xpath(xpathExpression)), 10000);
    const messageElement = await driver.findElement(By.xpath(xpathExpression));
    const messageActual = await messageElement.getText();
    console.log(messageActual);
    assert.equal(messageActual,expectedMessage)

});

Then('I should log in again', async () => {
    await driver.wait(until.elementLocated(By.xpath(".//a[contains(@href,'https://www.evernote.com/Login.action')]")), 20000);
    await loginPage.clickLoginPage(".//a[contains(@href,'https://www.evernote.com/Login.action')]");
    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await loginPage.enterCredentialsUsername('username','jhosedithbravo.23ar@gmail.com');
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('password'))), 5000);
    await loginPage.enterCredentialsPassword('password','Welcome01!');
    await loginPage.clickLoginButton('loginButton');

});


Then('I should open the note created', async () => {
    //await driver.wait(until.elementLocated(By.id('e02f694d-409f-55eb-2442-c38ff26dc56b_qa-NOTES_SIDEBAR_NOTE_SNIPPET')), 10000);
    await driver.wait(until.elementLocated(By.xpath(".//button[contains(@type,'button')]//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]")),20000);
    // Verificar que el mensaje contiene el texto esperado
    //div Fuix_q8N7ezroVVJ104t
    const mensajeElement = await driver.findElement(By.xpath(".//button[contains(@type,'button')]//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]//span[1]"));
    //.findElement(By.name('span'));
    const mensajeTexto = await mensajeElement.getText();
    assert.strictEqual(mensajeTexto, 'Automation testing by Jhosedith');

    // Hacer clic en la nota
    await driver.findElement(By.xpath(".//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]")).click();
});

Then('I should delete the note created', async () => {
    await driver.wait(until.elementLocated(By.xpath(".//div[contains(@aria-controls,'qa-ACTIONS_MODAL')]//button[contains(@type,'button')]")),20000);
    await driver.findElement(By.xpath(".//div[contains(@aria-controls,'qa-ACTIONS_MODAL')]//button[contains(@type,'button')]")).click();

    await driver.wait(until.elementLocated(By.xpath(".//ul[@id='default_dropdown_id']//li[contains(@role,'menuitem')]//a[@id='qa-ACTION_DELETE']")),20000);
    await driver.findElement(By.xpath(".//ul[@id='default_dropdown_id']//li[contains(@role,'menuitem')]//a[@id='qa-ACTION_DELETE']")).click();

});

Then('I should log out again', async () => {
    const xpath = '//li[contains(@class, "UyggXMRtZuBvlSJ5dJsD")]//div[@id= "qa-NAV_USER"]';
    await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
    await homePage.clickUserOptions(xpath);

    const xpathLogout = '//li[contains(@class, "ivs2kscNg5rtC99cXXHO")]//a[@id= "qa-ACCOUNT_DROPDOWN_LOGOUT"]';
    await driver.wait(until.elementLocated(By.xpath(xpathLogout)), 10000);
    await homePage.clickLogoutOption(xpathLogout);

    try {
        idMessage = 'qa-LOGOUT_CONFIRM_DIALOG_MESSAGE';
        await driver.wait(until.elementLocated(By.id(idMessage)), 20000);

        // Si se encuentra el mensaje, tomar la acción necesaria (hacer logout)
        idConfirmLogout= 'qa-LOGOUT_CONFIRM_DIALOG_CANCEL'
        await driver.wait(until.elementLocated(By.id(idConfirmLogout)), 10000);
        await homePage.clickConfirmLogout(idConfirmLogout);
    } catch (error) {
        // La excepción indica que el mensaje no está presente, continuar con el flujo normal
        console.log('Mensaje de confirmación no encontrado, continuando con el flujo normal.');
    }

});

Then('I should not log in with a correct email and incorrect password', async () => {
    await driver.wait(until.elementLocated(By.xpath(".//a[contains(@href,'https://www.evernote.com/Login.action')]")), 20000);
    await loginPage.clickLoginPage(".//a[contains(@href,'https://www.evernote.com/Login.action')]");
    await driver.wait(until.elementLocated(By.id('username')), 5000);
    await loginPage.enterCredentialsUsername('username','jhosedithbravo.23ar@gmail.com');
    try{
        await loginPage.clickButtonUntilElementAppears();
    }catch (error) {
        console.error('Error:', error);
    }
    await driver.wait(until.elementIsVisible(driver.findElement(By.id('password'))), 10000);
    await loginPage.enterCredentialsPassword('password','Welcome!');
    await loginPage.clickLoginButton('loginButton');
});



