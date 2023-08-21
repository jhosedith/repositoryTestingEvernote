const { Builder } = require('selenium-webdriver');
const config = require('../features/config/config');

async function createDriver() {
    return new Builder()
        .forBrowser(config.browser)
        .build();
}

module.exports = {
    createDriver
};