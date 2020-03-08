const login = require('../credentials');
// Go to frontend masters page
const URL = 'https://frontendmasters.com';

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => console.log(location.href));
});

describe('testing frontend', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toMatch(/frontend/i);
  });

  test('login form', async () => {
    await page.click('[href="/login/"]');

    await page.waitForSelector('form');
    await page.type('#username', login.user);
    await page.type('#password', login.password);
    await page.click('#remember');
    await page.click('button');
  }, 60000);
});
