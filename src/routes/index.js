const express = require('express');
const router = express.Router();
const generateController = require('../controllers/generateController');

// Show form
router.get('/', (req, res) => {
  res.render('index');
});

// Handle form submit
router.post('/generate', generateController.handleGenerate);
router.post('/preview', generateController.handlePreview);

module.exports = router;
