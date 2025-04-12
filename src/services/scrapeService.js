const puppeteer = require('puppeteer');

module.exports = async function scrapeService(moduleList) {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: './user-session' // Reuse the same logged-in session
  });

  const page = await browser.newPage();
  const results = [];

  try {
    for (const moduleUrl of moduleList) {
      console.log(`🔗 Navigating to: ${moduleUrl}`);
      await page.goto(moduleUrl, { waitUntil: 'networkidle2' });

      const content = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || 'Untitled';
        const body = document.querySelector('.w3-main')?.innerHTML || document.body.innerHTML;
        return { title, content: body };
      });

      console.log(`✅ Scraped: ${content.title} | ${content.content.length} characters`);
      results.push(content);
    }

    return results;
  } catch (error) {
    console.error('❌ Scraping failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
};
