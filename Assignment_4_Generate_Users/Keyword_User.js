const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

async function runScript(url, keyword) {
    const chromeOptions = new Options();
    chromeOptions.excludeSwitches('enable-logging');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    try {
        await driver.get(url);
        const keywordFound = await extendPresenceTime(driver, keyword);
        const presenceTime = await driver.executeScript(
            'return (new Date() - window.performance.timing.navigationStart) / 1000;'
        );
        if (keywordFound) {
            console.log(`Keyword "${keyword}" found on ${url}. Presence time: ${presenceTime.toFixed(2)} seconds`);
        } else {
            console.log(`Keyword "${keyword}" not found on ${url}. Presence time: ${presenceTime.toFixed(2)} seconds`);
        }
    } finally {
        await driver.quit();
    }
}
async function extendPresenceTime(driver, keyword) {
    const content = await driver.findElement(By.tagName('body')).getText();
    if (content.includes(keyword)) {
        await driver.sleep(10000);
        return true;
    } else {
        return false;
    }
}


runScript('file:///C:/Users/Santiago%20Perez/Desktop/Assingment4/Assignment%201.html', 'Helldivers')
    .catch(err => console.error(err));

