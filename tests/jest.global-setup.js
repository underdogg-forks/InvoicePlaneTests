const { chromium } = require('playwright');

module.exports = async () => {
  const browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOWMO) || 0,
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  });
  
  const page = await context.newPage();
  
  // Make browser, context, and page globally available
  global.__BROWSER__ = browser;
  global.__CONTEXT__ = context;
  global.__PAGE__ = page;
  global.page = page; // For your existing tests
};
