const config = require('../config/config');

async function navigateToURL(driver, path) {
    await driver.get(`${config.baseUrl}${path}`);

}

// Other utility functions

module.exports = {
    navigateToURL
    // Other utility functions
};