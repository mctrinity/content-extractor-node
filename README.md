# Node.js Content Extractor

A structured Node.js application that automates content scraping from public learning platforms (like W3Schools) and generates styled PDFs — with optional HTML preview before PDF export.

---

## 🚀 Features

- Express.js backend with EJS templating
- Dynamic content scraping using Puppeteer
- HTML preview before PDF export
- Styled, print-ready PDF generation
- Clean MVC-style project layout
- Automatic removal of unwanted ads, navbars, and popups
- Supports comma-separated full URLs (no login required)

---

## 📁 Folder Structure

```
content-extractor-node/
├── public/                # Static assets (e.g., style.css)
├── output/                # Generated PDFs and HTML previews
├── src/
│   ├── app.js             # Express app entry point
│   ├── routes/            # Route definitions
│   ├── controllers/       # Route logic
│   ├── services/          # Scraper + PDF generator
│   └── views/             # EJS templates (form + pdf layout)
├── .env.example           # Sample environment config
├── .gitignore             # Git ignore rules
├── package.json           # Project metadata
└── README.md              # Project documentation
```

---

## ⚙️ Setup

```bash
# Clone the repo or start fresh
npm install
cp .env.example .env
node src/app.js
```

Access the app at:

```
http://localhost:3000
```

---

## ✅ How to Use

1. Enter one or more **module URLs** (e.g., W3Schools pages)
2. Click:
   - **Generate PDF** – Scrapes the page and saves a print-ready PDF
   - **Preview HTML** – Renders the cleaned-up HTML in the browser for inspection

You can input multiple URLs separated by commas.

---

## 🧰 Output

- PDFs and HTML previews are saved in `/output/`
- Preview files use the same layout as the final PDF

---

## ⚖️ Legal Note

Use this tool only with content you have permission to access and extract.  
Respect the copyright and Terms of Use of any third-party websites.

---

## 📄 License

MIT

---

## 🙌 Contributing

Pull requests and feedback are welcome.  
Let’s keep things clean, secure, and useful!
