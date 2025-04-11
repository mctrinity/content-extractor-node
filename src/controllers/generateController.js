const scrapeService = require('../services/scrapeService');
const pdfService = require('../services/pdfService');

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
  
      // Render EJS template to HTML directly
      res.render('pdfTemplate', { modules: content });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error generating HTML preview.');
    }
  };
  