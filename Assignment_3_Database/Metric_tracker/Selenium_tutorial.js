const { By, Builder } = require('selenium-webdriver');
const assert = require("assert");

describe('First script', function () {
  let driver;

  this.timeout(10000); 

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('First Selenium script with mocha', async function () {
    await driver.get('file:///C:/Users/Santiago%20Perez/My%20project/Metric_tracker/Assignment%201.html');

    let title = await driver.getTitle();
    assert.equal("About Me - Santiago", title);

    let submitButton = await driver.findElement(By.id('democracyButton'));

    await submitButton.click();
  });

  after(async function () {
    if (driver) {
      console.log("Test completed. The browser will not close automatically. Close it manually.");
      await driver.pause();
    }
  });
});
