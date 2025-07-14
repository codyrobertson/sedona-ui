const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/dark');
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-dark-route.png', fullPage: true });
  await browser.close();
  console.log('Dark route screenshot saved as screenshot-dark-route.png');
})();