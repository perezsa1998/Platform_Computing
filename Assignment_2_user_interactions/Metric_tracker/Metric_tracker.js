const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

async function metricTracker() {
  let driver;

  try {
    // Initialize WebDriver
    driver = await new Builder().forBrowser('chrome').build();

    // Navigate to the webpage
    await driver.get('file:///C:/Users/Santiago%20Perez/My%20project/Metric_tracker/Assignment%201.html');

    // Wait for the entire webpage to load completely
    await driver.wait(async function () {
      return await driver.executeScript('return document.readyState') === 'complete';
    }, 30000);

    // Initialize metrics object
    let metrics = {
      timeSpent: 0,
      scrollDistance: 0,
      buttonClicks: 0,
      pageTitle: '',
    };

    // Start time for time spent metric
    const startTime = new Date().getTime();

    // Monitor scrolling
    await driver.executeScript("window.addEventListener('scroll', function() { metrics.scrollDistance = window.scrollY; });");

    // Monitor button clicks
    await driver.executeScript("document.getElementById('democracyButton').addEventListener('click', function() { metrics.buttonClicks++; });");

    // Get page title
    metrics.pageTitle = await driver.getTitle();

    // End time for time spent metric
    const endTime = new Date().getTime();
    metrics.timeSpent = Math.floor((endTime - startTime) / 1000); // Convert to seconds

    // Write metrics to CSV file
    let csvData = '';
    if (!fs.existsSync('metrics.csv')) {
      csvData = 'Time Spent (s),Scroll Distance (px),Button Clicks,Page Title\n';
    }
    csvData += `${metrics.timeSpent},${metrics.scrollDistance},${metrics.buttonClicks},"${metrics.pageTitle.replace(/"/g, '""')}"\n`;

    fs.appendFileSync('metrics.csv', csvData);

    console.log('Metrics appended to metrics.csv');
    console.log('Interact with the website to gather more metrics. Close the browser manually when done.');
    await new Promise(resolve => setTimeout(resolve, 60000));

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    if (driver) {
      await driver.quit();
    }
  }
}

// Run metric tracker function
metricTracker();
