const { Builder, By } = require('selenium-webdriver');
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
        const presenceTime = await extendPresenceTime(driver, keyword);
        console.log(`Presence time on ${url}: ${presenceTime.toFixed(2)} seconds`);
    } finally {
        await driver.quit();
    }
}
async function extendPresenceTime(driver, keyword) {
    let keywordFound = false;
    let imagesFound = false;
    let linksFound = false;

    const content = await driver.findElement(By.tagName('body')).getText();
    if (content.includes(keyword)) {
        await driver.sleep(10000);
        keywordFound = true;
    }
    const images = await driver.findElements(By.tagName('img'));
    if (images.length > 0) {
        imagesFound = true;
        for (const image of images) {
            await driver.sleep(10000);
        }
    }
    const links = await driver.findElements(By.tagName('a'));
    if (links.length > 0) {
        linksFound = true;
    }
    if (keywordFound || imagesFound || linksFound) {
        if (keywordFound && imagesFound && linksFound) {
            console.log(`Keyword "${keyword}" found, images and links present on the page.`);
        } else if (keywordFound && imagesFound) {
            console.log(`Keyword "${keyword}" found and images present on the page.`);
        } else if (keywordFound && linksFound) {
            console.log(`Keyword "${keyword}" found and links present on the page.`);
        } else if (imagesFound && linksFound) {
            console.log(`Images and links present on the page.`);
        } else if (keywordFound) {
            console.log(`Keyword "${keyword}" found on the page.`);
        } else if (imagesFound) {
            console.log(`Images present on the page.`);
        } else if (linksFound) {
            console.log(`Links present on the page.`);
        }
        return await driver.executeScript('return (new Date() - window.performance.timing.navigationStart) / 1000;');
    } else {
        console.log(`Keyword "${keyword}" not found, no images, and no links present on the page.`);
        return await driver.executeScript('return (new Date() - window.performance.timing.navigationStart) / 1000;');
    }
}

runScript('file:///C:/Users/Santiago%20Perez/Desktop/Assingment4/Assignment%201.html', 'Helldivers')
    .catch(err => console.error(err));

