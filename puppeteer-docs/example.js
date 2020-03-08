// Navigate to https://example.com and take a screenshot
const puppeteer = require('puppeteer');

// Everything happens in sequence because of the awaits
(async () => {
  // Open browser
  const browser = await puppeteer.launch();
  // Open page on browser
  const page = await browser.newPage();
  // Manipulate with APIs
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
