const puppeteer = require('puppeteer');

module.exports = async function scrapeService(moduleList) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  try {
    for (const moduleUrl of moduleList) {
      await page.goto(moduleUrl, { waitUntil: 'networkidle2' });

      const content = await page.evaluate(() => {
        const title = document.querySelector('h1')?.innerText || 'Untitled';
        const body = document.querySelector('.w3-main')?.innerHTML || 'No content found.';
        return { title, content: body };
      });
      

      results.push(content);
    }

    return results;
  } catch (error) {
    console.error('Scraping failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
};
