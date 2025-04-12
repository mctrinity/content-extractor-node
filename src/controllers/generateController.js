const puppeteer = require('puppeteer');
const scrapeService = require('../services/scrapeService');
const pdfService = require('../services/pdfService');
const ejs = require('ejs');
const path = require('path');

exports.handleLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const browser = await puppeteer.launch({
        headless: false, // Set to true in production
        userDataDir: './user-session',
        slowMo: 50
      });
  
      const page = await browser.newPage();
  
      const loginUrl = process.env.LOGIN_URL || 'https://profile.w3schools.com/login';
      await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
  
      console.log('💡 Page loaded. Reloading to ensure dynamic content...');
      await page.reload({ waitUntil: 'domcontentloaded' });
  
      const content = await page.content();
      console.log('🧪 Loaded page content length:', content.length);
  
      console.log('💡 Waiting for email input field...');
      await page.waitForSelector('input[name="email"]', { timeout: 15000 });
  
      console.log('⌨️ Typing credentials...');
      await page.type('input[name="email"]', username);
      await page.type('input[name="password"]', password);
  
      console.log('🖱 Clicking login button...');
      await page.click('button[type="submit"]');
  
      console.log('⏳ Waiting for post-login page...');
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
  
      await browser.close();
  
      // ✅ Render login.ejs with success flag
      res.render('login', { success: true });
  
    } catch (err) {
      console.error('❌ Login failed:', err.message);
      res.status(500).send('❌ Login failed. Please check your credentials or try again.');
    }
  };
  

exports.handleGenerate = async (req, res) => {
  const { modules } = req.body;

  if (!modules) {
    return res.status(400).send('Please provide at least one module URL.');
  }

  const moduleList = modules.split(',').map(m => m.trim());

  try {
    const content = await scrapeService(moduleList);
    const pdfPath = await pdfService(content);
    res.download(pdfPath);


  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF.');
  }
};

exports.handlePreview = async (req, res) => {
  const { modules } = req.body;

  if (!modules) {
    return res.status(400).send('Please provide at least one module URL.');
  }

  const moduleList = modules.split(',').map(m => m.trim());

  try {
    const content = await scrapeService(moduleList);
    res.render('pdfTemplate', { modules: content });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating HTML preview.');
  }
};
