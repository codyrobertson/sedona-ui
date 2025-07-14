const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');
  
  // Set to dark mode
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-dark-mode.png', fullPage: true });
  await browser.close();
  console.log('Dark mode screenshot saved as screenshot-dark-mode.png');
})();