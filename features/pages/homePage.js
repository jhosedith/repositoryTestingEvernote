const { By,until,ExpectedConditions } = require('selenium-webdriver');

class HomePage{
    
    constructor(driver) {
        this.driver = driver;
    } 

    async clickCreateNote(locator){
        this.driver.findElement(By.id(locator)).click();
    }

    async sendNewNote(locator,note) {
        await this.driver.findElement(By.xpath(locator)).sendKeys(note);
    }

    async getMessageLabel(locator){
        await this.driver.findElement(By.id(locator));
    }

    async clickOnTitle(locator){
       await this.driver.findElement(By.xpath(locator)).click();
    }

    async clickOnOptions(locator){
        this.driver.findElement(By.id(locator)).click();
    }

    async clickOnDeleteOption(locator){
        this.driver.findElement(By.id(locator)).click();
    }

    async clickUserOptions(locator){
        this.driver.findElement(By.xpath(locator)).click();
    }
    
    async clickLogoutOption(locator){
        this.driver.findElement(By.xpath(locator)).click();
    }

    async clickConfirmLogout(locator){
        this.driver.findElement(By.id(locator)).click();
    }

    
    
 }

 module.exports = HomePage;