// Create a PDF
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  // Able to pass in optional arguyments
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle2'
  });
  await page.pdf({ path: 'hn.pdf', format: 'A4' });

  await browser.close();
})();
