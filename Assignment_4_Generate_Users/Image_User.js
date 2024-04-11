const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');


async function extendPresenceTime(driver) {
    const images = await driver.findElements(By.tagName('img'));
    if (images.length > 0) {
        console.log('Found image(s) on the page.');
    } else {
        console.log('No images found on the page.');
    }
    for (const image of images) {      
        await driver.sleep(10000); 
    }
}
async function runScript(url) {
    const chromeOptions = new Options();
    chromeOptions.excludeSwitches('enable-logging');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    try {
        await driver.get(url);
        await extendPresenceTime(driver);
        const presenceTime = await driver.executeScript(
            'return (new Date() - window.performance.timing.navigationStart) / 1000;'
        );
        console.log(`Presence time on ${url}: ${presenceTime.toFixed(2)} seconds`);
    } finally {
        await driver.quit();
    }
}

runScript('file:///C:/Users/Santiago%20Perez/Desktop/Assingment4/Assignment%201.html')
    .catch(err => console.error(err));

