const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001/');
  
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot-styleguide.png', fullPage: true });
  await browser.close();
  console.log('Style guide screenshot saved as screenshot-styleguide.png');
})();