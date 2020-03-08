// evaluate script (function) in the context of a page
// Default is headless
// const puppeteer = require('puppeteer');

(async () => {
  // devtools: true allows you to debug within the browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Chromium will stop in debug mode
  // await page.evaluate(() => {
  //   debugger;
  // });

  // Debug in node
  debugger;
  // await page.click('a[target=_blank]');

  // Console log inside of the headless browser
  await page.evaluate(() => console.log(`url is ${location.href}`));

  // Listens for console events? Need to test
  page.on('console', msg => console.log(`PAGE LOG: `, msg.text()));

  // Get the 'viewport' of the page, as reported by the page
  // If evaluate returns a promise, then puppeteer waits for the promise to resolve
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions: ', dimensions);

  await browser.close();
})();
