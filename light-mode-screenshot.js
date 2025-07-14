const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3001');
  
  // Set to light mode by clicking theme toggle if needed
  await page.evaluate(() => {
    // Force light mode by setting theme
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshot-light-mode.png', fullPage: true });
  await browser.close();
  console.log('Light mode screenshot saved as screenshot-light-mode.png');
})();