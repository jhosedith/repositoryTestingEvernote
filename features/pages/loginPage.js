const { By,until,ExpectedConditions } = require('selenium-webdriver');

class LoginPage{
    
    constructor(driver) {
        this.driver = driver;
        this.button = By.id('loginButton'); 
        this.desiredElement = By.id('password')
        this.maxRetries = 5; 
    }

    async clickLoginPage(locator){
        this.driver.findElement(By.xpath(locator)).click();
    }

    async enterCredentialsUsername(locator, username) {
        await this.driver.findElement(By.id(locator)).sendKeys(username);
    }

    async enterCredentialsPassword(locator,password) {
        await this.driver.findElement(By.id(locator)).sendKeys(password);
    }

    async clickLoginButton(locator) {
        await this.driver.findElement(By.id(locator)).click();
    }

    async clickLoginButtonContinue(locator) {
        await this.driver.findElement(By.xpath(locator)).click();
    }

    async clickButtonUntilElementAppears() {
        try {
            await this.clickButtonRecursive(1);
        } catch (error) {
            console.error('Error:', error);
        } 
    }

    async clickButtonRecursive(attempt) {
        if (attempt > this.maxRetries) {
            console.log('Maximum retries reached. Element did not appear.');
            return;
        }

        try {
            const buttonElement = await this.driver.findElement(this.button);
            await buttonElement.click();
            try {
                await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.desiredElement)), 10000); 
                console.log('Desired element appeared!');
            } catch (error) {
                console.log(`Attempt ${attempt}: Button clicked, but desired element did not appear. Retrying...`);

                await this.clickButtonRecursive(attempt + 1); 
            }
        } catch (error) {
            console.log(`Attempt ${attempt}: Button not available yet. Retrying...`);
            await this.clickButtonRecursive(attempt + 1); 
        }
    }    

}

module.exports = LoginPage;

