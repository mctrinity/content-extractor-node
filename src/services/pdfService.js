const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

module.exports = async function pdfService(contentArray) {
  const templatePath = path.join(__dirname, '../views/pdfTemplate.ejs');
  const html = await ejs.renderFile(templatePath, { modules: contentArray });

  // ⬇️ Save HTML preview
  const previewHtmlPath = path.join('output', `preview-${Date.now()}.html`);
  await fs.writeFile(previewHtmlPath, html, 'utf8');
  console.log(`🔍 HTML preview saved: ${previewHtmlPath}`);

  const outputPath = path.join('output', `modules-${Date.now()}.pdf`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  return outputPath;
};
