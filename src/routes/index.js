const express = require('express');
const router = express.Router();
const generateController = require('../controllers/generateController');

// Show main content extractor page
router.get('/', (req, res) => {
  res.render('index');
});

// Show login form page
router.get('/login', (req, res) => {
  res.render('login', { success: false });
});

// Handle login form submission
router.post('/login', generateController.handleLogin);

// Handle module scraping actions
router.post('/generate', generateController.handleGenerate);
router.post('/preview', generateController.handlePreview);

module.exports = router;
