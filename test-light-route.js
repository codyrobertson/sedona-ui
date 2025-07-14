const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/light');
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-light-route.png', fullPage: true });
  await browser.close();
  console.log('Light route screenshot saved as screenshot-light-route.png');
})();